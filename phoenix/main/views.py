from django.shortcuts import render, redirect, HttpResponse
from django.contrib.auth import logout
from django.views.generic import TemplateView, CreateView
from django.contrib.auth.views import LoginView
from .models import *
from .forms import *
from django.urls import reverse
from django.contrib.auth.forms import AuthenticationForm


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
            return HttpResponse("дебил бля юра где rest_id сука ты блять сейчас по жопе дам")
        content = Table.objects.filter(rest_id=rest_id).all()
            
    return render(None, f'main/app_{type}.html', {"content": content})

