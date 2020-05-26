from django.urls import path, include
from django.conf.urls import url
from django.contrib import admin
from django.contrib.auth import urls as auth_urls

from rest_framework import urls
from rest_framework.authtoken import views

from .views import RegisterUserAPIView

from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView


urlpatterns = [
    path('token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('register/', RegisterUserAPIView.as_view(), name='register_user'),
]