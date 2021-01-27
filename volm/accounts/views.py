from django.shortcuts import render
from django.urls import reverse_lazy
from django.views.generic import CreateView, ListView, TemplateView
from django.contrib.auth.mixins import LoginRequiredMixin

from .forms import UserSignUpForm
from workers.models import Address, Worker
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

class ProfileView(LoginRequiredMixin, ListView):
    template_name = 'accounts/profile_base.html'

    def get_queryset(self):
        return Worker.objects.filter(active=True, user=self.request.user).order_by('-created')

class SignUp(CreateView):
    form_class = UserSignUpForm
    success_url = reverse_lazy('login')
    template_name = 'accounts/signup.html'
