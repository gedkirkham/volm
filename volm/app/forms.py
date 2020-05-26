from django import forms
from django.contrib.auth.forms import AuthenticationForm, UserCreationForm
from django.contrib.auth.models import User

class ContactForm(forms.Form):
	cc_myself = forms.BooleanField(required=False)
	message = forms.CharField(widget=forms.Textarea)
	subject = forms.CharField(max_length=100)
	sender = forms.EmailField()

    