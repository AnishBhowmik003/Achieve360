from django.db import models

# Create your models here.
class React(models.Model):
    name = models.charField(max_length=100)
    email = models.EmailField()
    password1 = models.CharField(max_length=30)
    password2 = models.CharField(max_length=30)