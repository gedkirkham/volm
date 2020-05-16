from django import forms
from django.contrib.auth.forms import AuthenticationForm, UserCreationForm

from django.contrib.auth.models import User

class ContactForm(forms.Form):
	cc_myself = forms.BooleanField(required=False)
	message = forms.CharField(widget=forms.Textarea)
	subject = forms.CharField(max_length=100)
	sender = forms.EmailField()

class LoginForm(forms.Form):
    username = forms.CharField(label="Username", max_length=100)
    password = forms.CharField(label="Password", max_length=100)

class RegistrationForm(UserCreationForm):
    email = forms.EmailField(label="Email", max_length=100)
    first_name = forms.CharField(label="First name:", max_length=100)
    last_name = forms.CharField(label="Last name:", max_length=100)

    class Meta:
        model = User
        fields = ['email', 'first_name', 'last_name', 'password1', 'password2', 'username']
    