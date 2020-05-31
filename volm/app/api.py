from django.shortcuts import render
from django.contrib.auth.models import User

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

    def compare_passwords(this, password, password_2):
        if password and password_2 and password == password_2:
            return True
        elif password and password_2 and password != password_2:
            return False
        return False

    def post(self, request, *args, **kwargs):
        data = request.data
        
        password_2 = data['password_2']
        data.pop('password_2')

        serializer = RegistrationSerializer(data=data)
        errors = {}

        data = request.data
        passwords_match = self.compare_passwords(data['password'], password_2)
        if serializer.is_valid() and passwords_match:
            user = User.objects.create_user(
                    email=data['email'],
                    first_name=data['first_name'],
                    last_name=data['last_name'],
                    password=data['password'], 
                    username=data['email'],
                )
            return Response(status=status.HTTP_201_CREATED)
        if not passwords_match:
            errors['password_mismatch'] = True
        errors.update(serializer.errors)
        return Response(errors, status=status.HTTP_400_BAD_REQUEST)
