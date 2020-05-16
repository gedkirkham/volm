from django.shortcuts import render
from django.http import HttpResponse, HttpResponseRedirect
from django.views import View
from django.views.generic import TemplateView
from django.contrib.auth import authenticate, login
from django.contrib.auth.decorators import login_required
from django.contrib.auth.mixins import LoginRequiredMixin
from django.core.mail import send_mail

from .forms import ContactForm, LoginForm, RegistrationForm

class ContactView(View): # TODO: configure email backend
	form_class = ContactForm
	template_name = 'app/contact.html'

	def get(self, request, *args, **kwargs):
		form = self.form_class()
		return render(request, self.template_name, { 'form': form })
	
	def post(self, request, *args, **kwargs):
		form = self.form_class(request.POST)
		if form.is_valid():
			subject = form.cleaned_data['subject']
			message = form.cleaned_data['message']
			sender = form.cleaned_data['sender']
			cc_myself = form.cleaned_data['cc_myself']

			recipients = ['gedkirkham@protonmail.com']
			if cc_myself:
				recipients.append(sender)

			send_mail(subject, message, sender, recipients)
			return HttpResponseRedirect('/thanks/')
		return render(request, self.template_name, {'form': form })

class IndexView(LoginRequiredMixin, TemplateView):
    login_url = '/login/'
    template_name = "app/index.html"    

class LoginView(View):
    form_class = LoginForm
    template_name = 'app/login.html'

    def get(self, request, *args, **kwargs):
        form = self.form_class()
        return render(request, self.template_name,  { 'form': form })

    def post(self, request, *args, **kwargs):
        form = self.form_class(request.POST)
        if form.is_valid():
            username = form.cleaned_data['username']
            password = form.cleaned_data['password']
            user = authenticate(username=username, password=password)
            if user is not None:
                login(request, user)
                return HttpResponseRedirect('/')
            else:
                return HttpResponse('Unauthorised', status=401)
        
        return render(request, self.template_name, { 'form': form })

class RegistrationView(View): # TODO: install django-allauth
    form_class = RegistrationForm
    template_name = 'app/register.html'

    def get(self, request, *args, **kwargs):
        form = self.form_class()
        return render(request, self.template_name, { 'form': form })

    def post(self, request, *args, **kwargs):
        form = self.form_class(request.POST)
        if form.is_valid():
            user = form.save() 
            login(request, user)
            return HttpResponseRedirect('/')
        return render(request, self.template_name, {'form': form })

