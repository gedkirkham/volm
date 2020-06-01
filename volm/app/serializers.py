from django.contrib.auth.models import User

from rest_framework import serializers

class RegistrationSerializer(serializers.ModelSerializer):
    first_name = serializers.CharField(max_length=30)
    last_name = serializers.CharField(max_length=150)
    class Meta:
        model = User
        fields = ['email', 'first_name', 'last_name', 'password', 'username', ]