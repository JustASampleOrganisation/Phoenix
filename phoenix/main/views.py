from django.shortcuts import render
from django.views.generic import TemplateView


class Index(TemplateView):
    template_name = 'main/app.html'

def get_app_frame(request): 
    type = request.GET['frame'] 
    return render(None, f'main/app_{type}.html')