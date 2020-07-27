from django.shortcuts import render
from django.contrib.auth.models import User
from django.contrib.auth.password_validation import validate_password
from django.core.exceptions import ValidationError

from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status

from .serializers import RegistrationSerializer

class GetUserDetailAPIView(APIView):

    def get(self, request, *args, **kwargs):
        usernames = [user.username for user in User.objects.all()]
        return Response(usernames)

class RegisterUserAPIView(APIView):
    """
    An API view that creates a user, with no privileges, from the given email and password.
    """
    authentication_classes = []
    permission_classes = []

    def post(self, request, *args, **kwargs):
        data = request.data
        
        serializer = RegistrationSerializer(data=data)
        errors = {}

        errors = self.validate_password(data['password'], errors)
        
        if serializer.is_valid() and not errors:
            user = User.objects.create_user(
                    email=data['email'],
                    first_name=data['first_name'],
                    last_name=data['last_name'],
                    password=data['password'], 
                    username=data['email'],
                )
            return Response(status=status.HTTP_201_CREATED)
        
        errors.update(serializer.errors)
        return Response(errors, status=status.HTTP_400_BAD_REQUEST)

    def validate_password(this, password, errors):
        try:
            validate_password(password)
        except ValidationError as e:
            errors['password'] = e
        return errors
