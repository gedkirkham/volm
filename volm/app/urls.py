from django.urls import path
from django.contrib import admin

from .views import IndexView, LoginView

urlpatterns = [
    path('admin/', admin.site.urls),
    path('', IndexView.as_view()),
    path('login/', LoginView.as_view()),
]