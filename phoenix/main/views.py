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
import json

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
    session_id = None
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
        if request.GET.get('session_id'):
            session_id = request.GET['session_id']
        if not session_id:
            table = Table.objects.get(id=table_id)
            new_order = Order(status='p', start_date=datetime.datetime.now(), end_date=None, table_id=table)
            new_order.save()
            request.session['order_id'] = new_order.id
            request.session['rest_id'] = table.rest_id.id
    elif int(type) == 7:
        rest = Restaurant.objects.get(id=request.session['rest_id'])
        content = Product.objects.filter(rest_id=rest)
    elif int(type) == 8:
        if request.GET.get('product_id'):
            content = Product.objects.get(id=request.GET.get('product_id'))
        else:
            return HttpResponse(settings.FRONT_MESSAGE)
    
    return render(request, f'main/app_{type}.html', {"content": content})

def get_basket(request):
    if request.GET.get('order_id'):
        order = Order.objects.get(id=request.GET['order_id'])
        basket = OrderBasket.objects.filter(order_id=order).all()
        results = [ob.as_json() for ob in basket]
        return HttpResponse(json.dumps(results, ensure_ascii=False).encode('utf-8'), content_type="application/json")

    else:
        return HttpResponse(settings.FRONT_MESSAGE)
    
def add_to_basket(request):
    if request.GET.get('product_id') and request.GET.get('order_id') and request.GET.get('number'):
        order = Order.objects.get(id=int(request.GET['order_id']))
        product = Product.objects.get(id=request.GET['product_id'])
        basket = OrderBasket.objects.create(order_id=order, product_id=product, number=request.GET['number'])
        basket.save()
        return HttpResponse('success')
    else:
        return HttpResponse(settings.FRONT_MESSAGE)
