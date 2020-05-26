from django.urls import path, include
from django.contrib import admin
from django.contrib.auth import urls as auth_urls

from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from .api import RegisterUserAPIView

urlpatterns = [
    path('api/token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('api/register/', RegisterUserAPIView.as_view(), name='register_user'),
]