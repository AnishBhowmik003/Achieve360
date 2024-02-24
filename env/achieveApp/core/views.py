from django.shortcuts import render
from rest_framework.views import APIView
from . models import *
from rest_framework.response import Response
from . serializer import *

# Create your views here.

class ReactView(APIView):
    serializer_class = ReactSerializer
    
    def get(self, request):
        user = [{"name": user.name, "email": user.email, "password1": user.password1, "password2": user.password2} for user in React.objects.all()]
        return Response(user)
    
    def post(self, request):
        serializer = ReactSerializer(data=request.data)
        if serializer.is_valid(raise_exception=True):
            serializer.save()
            return Response(serializer.data)