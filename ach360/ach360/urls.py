"""
URL configuration for ach360 project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/5.0/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path
from ninja import NinjaAPI
from .accHandler import *

#run with python manage.py runserver
#make sure you are in ./ach360/
#view graphical view of api with http://127.0.0.1:8000/api/docs#/default/ach360_urls_add


api = NinjaAPI()


@api.get("/createUser")
def add(request, username: str, password: str, email: str, phoneNumber: int):
    output = create_user(username, password, email, phoneNumber)
    return {"result": output}

@api.get("/login")
def add(request, username: str, password: str):
    output = login(username, password)
    return {"result": output}

@api.get("/deleteUser")
def add(request, username: str):
    output = delete_user(username)
    return {"result": output}


urlpatterns = [
    path("admin/", admin.site.urls),
    path("api/", api.urls),
]
