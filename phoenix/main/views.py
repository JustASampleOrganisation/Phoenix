from django.shortcuts import render, redirect, HttpResponse
from django.contrib.auth import logout
from django.views.generic import TemplateView, CreateView
from django.contrib.auth.views import LoginView
from .models import *
from .forms import *
from django.urls import reverse
from django.contrib.auth.forms import AuthenticationForm
from phoenix import settings
import datetime

class Index(TemplateView):
    template_name = 'main/app.html'

class RegisterView(CreateView): 
    form_class = RegisterUserForm 
    template_name = 'main/register.html'
    
    def get_context_data(self, **kwargs): 
        context = super(RegisterView, self).get_context_data() 
        context["title"] = 'Регистрация' 
        return context
    
    def get_success_url(self): 
        return reverse('login')
 

class LoginUserView(LoginView): 
    form_class = AuthenticationForm 
    template_name = 'main/login.html' 
    def get_context_data(self, **kwargs): 
        context = super(LoginUserView, self).get_context_data() 
        context["title"] = 'Авторизация' 
        return context 
    def get_success_url(self): 
        return reverse('home') 


def logout_user(request): 
    logout(request) 
    return redirect('home')


def get_app_frame(request): 
    type = request.GET['frame'] 
    content = None
    order = None
    if int(type) == 1:
        return redirect('home')
    elif int(type) == 2: 
        return redirect('register')
    elif int(type) == 3:
        return redirect('login')
    elif int(type) == 4:
        content = Restaurant.objects.all()
    elif int(type) == 5:
        if request.GET.get('rest_id'):
            rest_id = request.GET['rest_id']
        else:
            return HttpResponse(settings.FRONT_MESSAGE)
        content = Table.objects.filter(rest_id=rest_id).all()
    elif int(type) == 6:
        if request.GET.get('table_id'):
            table_id = request.GET['table_id']
        else:
            return HttpResponse(settings.FRONT_MESSAGE)
        table = Table.objects.get(id=table_id)
        new_order = Order(status='p', start_date=datetime.datetime.now(), end_date=None, table_id=table)
        new_order.save()
        order = new_order.id
    return render(None, f'main/app_{type}.html', {"content": content, "order": order})

