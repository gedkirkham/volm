from django.shortcuts import render
from django.urls import reverse_lazy
from django.views.generic import CreateView, ListView, TemplateView
from django.contrib.auth.mixins import LoginRequiredMixin

from .forms import UserSignUpForm
from workers.models import Worker

class ProfileView(LoginRequiredMixin, ListView):
    template_name = 'accounts/profile_base.html'

    def get_queryset(self):
        return Worker.objects.filter(active=True, user=self.request.user).order_by('-created')

class SignUp(CreateView):
    form_class = UserSignUpForm
    success_url = reverse_lazy('login')
    template_name = 'accounts/signup.html'
