from django.urls import path, include
from django.contrib import admin
from django.contrib.auth import urls as auth_urls

from .views import ContactView, IndexView, LoginView, RegistrationView

urlpatterns = [
    path('admin/', admin.site.urls),
    path('', include(auth_urls)),
    path('register/', RegistrationView.as_view()),
    path('contact/', ContactView.as_view()),
    path('', IndexView.as_view()),
]