from django.shortcuts import render
from django.contrib.auth.models import User

from rest_framework.views import APIView
from rest_framework.response import Response

class GetUserDetailAPIView(APIView):

    def get(self, request, *args, **kwargs):
        usernames = [user.username for user in User.objects.all()]
        return Response(usernames)