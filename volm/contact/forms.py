from django import forms
from django.utils.translation import gettext_lazy as _
from django.core import mail

class EmailForm(forms.Form):
    message = forms.CharField(widget=forms.Textarea())
    name = forms.CharField()
    sender = forms.CharField()
    subject = forms.CharField()

    def send_email(self):
        with mail.get_connection() as connection:
            mail.EmailMessage(
                self.cleaned_data['subject'], 
                self.cleaned_data['message'], 
                self.cleaned_data['sender'], 
                ['gedkirkham@protonmail.com'],
                connection = connection,
            ).send()