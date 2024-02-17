from django.urls import path
from . import views

urlpatterns = [
    path('', views.homepage, name=''),
    path('register', views.registerPage, name='register'),
    path('login', views.loginPage, name='login'),
    path('dashboard', views.dashboardPage, name='dashboard'),
    path('userLogout', views.userLogout, name='userLogout'),
]