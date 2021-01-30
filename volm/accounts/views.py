from django.shortcuts import render
from django.urls import reverse_lazy
from django.views.generic import CreateView, TemplateView, UpdateView
from django.contrib.auth.mixins import LoginRequiredMixin
from django.contrib.auth import get_user_model

from .forms import UserSignUpForm
from .models import Address
from workers.models import Worker

User = get_user_model()

class AddressCreateView(LoginRequiredMixin, CreateView):
    model = Address
    template_name_suffix = '_create_update_form'
    fields = ['line_1', 'line_2', 'city', 'country', 'postcode']
    success_url = reverse_lazy('accounts:profile')

    def form_valid(self, form):
        self.object = form.save(commit=False)
        self.object.user = self.request.user
        self.object.save()
        return super(AddressCreateView, self).form_valid(form)

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        context['type'] = 'New'
        return context

class AddressUpdateView(LoginRequiredMixin, UpdateView):
    model = Address
    template_name_suffix = '_create_update_form'
    fields = ['line_1', 'line_2', 'city', 'country', 'postcode']
    success_url = reverse_lazy('accounts:profile')

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        context['type'] = 'Update'
        return context

class ProfileView(LoginRequiredMixin, TemplateView):
    template_name = 'accounts/profile_base.html'

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        context['address'] = Address.objects.get(user=self.request.user)
        context['workers'] = Worker.objects.filter(active=True, user=self.request.user).order_by('-created')
        return context

class SignUp(CreateView):
    form_class = UserSignUpForm
    success_url = reverse_lazy('login')
    template_name = 'accounts/signup.html'
