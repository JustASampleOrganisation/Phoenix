from django.contrib import admin
from django.urls import path
from .views import *

urlpatterns = [
    path('', Index.as_view()),
    path('get_app_frame', get_app_frame),
]
