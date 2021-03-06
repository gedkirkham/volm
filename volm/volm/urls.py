"""volm URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/3.0/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.contrib.auth import urls as auth_urls
from django.conf.urls.static import static
from django.urls import path, include

from .views import HomePage, ThanksPage, TestPage
from volm import settings
from workers.views import WorkerListView

urlpatterns = [
    path('admin/', admin.site.urls),
    path('accounts/', include('accounts.urls', namespace='accounts')),
    path('accounts/', include('django.contrib.auth.urls')),
    path('', WorkerListView.as_view(), name='home'),
    path('orgs/', include('orgs.urls', namespace='orgs')),
    path('workers/', include('workers.urls', namespace='workers')),
    path('contact/', include('contact.urls', namespace='contact')),
    path('thanks/', ThanksPage.as_view(), name='thanks'),
    path('test/', TestPage.as_view(), name='test'),
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
 
