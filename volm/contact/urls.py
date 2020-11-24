from django.urls import path

from .views import EmailView, ThankYouView

app_name = 'contact'

urlpatterns = [
    path('email/', EmailView.as_view(), name="contact_email"),
    path('thank_you/', ThankYouView.as_view(), name="thank_you"),
]