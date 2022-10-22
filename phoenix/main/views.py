from django.shortcuts import render
from django.views.generic import TemplateView
from .models import *

class Index(TemplateView):
    template_name = 'main/app.html'

def get_app_frame(request): 
    type = request.GET['frame'] 
    if int(type) == 4:
        content = Restaurant.objects.all()
        
    else:
        content = None
    return render(None, f'main/app_{type}.html', {"content": content})

