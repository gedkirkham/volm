from django.shortcuts import render
from django.views.generic.edit import FormView
from django.urls import reverse, reverse_lazy
from django.views.generic.base import TemplateView

from contact.forms import EmailForm

class EmailView(FormView):
    template_name = 'contact/email_form.html'
    form_class = EmailForm
    success_url = reverse_lazy('contact:thank_you')

    def form_valid(self, form):
        form.send_email()
        return super().form_valid(form)

class ThankYouView(TemplateView):
    template_name = 'contact/thank_you.html'
