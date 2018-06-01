from django.urls import path

from . import views

app_name = 'demo'

urlpatterns = [
    path('', views.index, name="index"),
    path('bayer', views.bayer, name="bayer"),
]