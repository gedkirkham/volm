from django.contrib.auth.models import User

from rest_framework import serializers

class RegistrationSerializer(serializers.ModelSerializer):
    email = serializers.EmailField(max_length=150)
    class Meta:
        model = User
        fields = ['email', 'first_name', 'last_name', 'password', 'username', ]