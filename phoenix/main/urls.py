from django.contrib import admin
from django.urls import path
from .views import *

urlpatterns = [
    path('', Index.as_view(), name='home'),
    path('get_app_frame', get_app_frame, name='get_app_frame'),
    path('register/', RegisterView.as_view(), name='register'), 
    path('login/', LoginUserView.as_view(), name='login'), 
    path('logout/', logout_user, name='logout'),
]
