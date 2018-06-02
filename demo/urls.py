from django.urls import path

from . import views

app_name = 'demo'

urlpatterns = [
    path('', views.index, name="index"),
    path('semEP_59', views.semep59, name='cluster1'),
    path('semEP_59.json', views.semep59json),
    path('semEP_59.js', views.semep59js),
    path('semEP_59.drugs', views.semep59drugs),

    path('semEP_74', views.semep74, name='cluster2'),
    path('semEP_74.json', views.semep74json),
    path('semEP_74.js', views.semep74js),
    path('semEP_74.drugs', views.semep74drugs),

    path('semEP_168', views.semep74, name='cluster3'),
    path('semEP_168.json', views.semep168json),
    path('semEP_168.js', views.semep168js),
    path('semEP_168.drugs', views.semep168drugs),
    path('semEP_168.drugs.js', views.semep168drugsjs),

    path('semEP_190', views.semep190, name='cluster4'),
    path('semEP_190.json', views.semep190json),
    path('semEP_190.js', views.semep190js),
    path('semEP_190.drugs', views.semep190drugs),

    path('style.cycss', views.stylecysss),
    path('bayer', views.bayer, name="bayer"),

]