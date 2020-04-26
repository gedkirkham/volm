from django.urls import path

from . import views

urlpatterns = [
    path('', views.index, name='index'),
    path('org/<int:org_id>', views.organisation, name="organisation"),
    path('advert/<int:advert_id>', views.advert, name="advert"),
]