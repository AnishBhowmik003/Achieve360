from django.shortcuts import render, redirect
from .forms import CreateUserForm, LoginForm
from django.contrib.auth.decorators import login_required
from django.contrib.auth.models import auth

from django.contrib.auth import authenticate, login, logout

#Authentication models and functions

# Create your views here.
def homepage(request):
    return render(request, 'register/index.html')

def registerPage(request):
    form = CreateUserForm()
    if request.method == 'POST':
        form = CreateUserForm(request.POST)
        if form.is_valid():
            form.save()
            return redirect("login")

    context = {'registerForm': form}

    return render(request, 'register/register.html', context=context)

def loginPage(request):
    form = LoginForm()
    if request.method == 'POST':
        form = LoginForm(request, data=request.POST)
        if form.is_valid():
            username = request.POST.get('username')
            password = request.POST.get('password')
            user = authenticate(request, username=username, password=password)
            if user is not None:
                auth.login(request, user)
                return redirect("dashboard")

    context = {'loginForm': form}

    return render(request, 'register/login.html', context=context)

def userLogout(request):
    auth.logout(request)
    return redirect("")

@login_required(login_url="login")
def dashboardPage(request):
    return render(request, 'register/dashboard.html')