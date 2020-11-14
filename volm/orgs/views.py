from django.shortcuts import render, get_object_or_404, redirect
from django.views.generic import CreateView, DetailView, DeleteView, ListView, TemplateView, UpdateView
from django.contrib.auth.mixins import LoginRequiredMixin
from django.contrib.auth.decorators import login_required
from django.urls import reverse_lazy
from .models import Org
from .forms import OrgForm

class OrgCreateView(CreateView, LoginRequiredMixin):
    login_url = '/login/'
    redirect_field_name = 'orgs/org_detail.html'
    model = Org
    form_class = OrgForm
    template_name_suffix = '_update_create_form'
    
class OrgDetailView(DetailView):
    model = Org
    template_name = 'orgs/org_detail.html'
    
class OrgDeleteView(LoginRequiredMixin, DeleteView):
    login_url = '/login/'
    success_url = reverse_lazy('org_list')
    model = Org

class OrgDraftListView(LoginRequiredMixin, ListView):
    login_url = '/login/'
    template_name = 'orgs/org_draft_list.html'
    model = Org

    def get_queryset(self):
        return Org.objects.filter(published__isnull=True).order_by('-created')

class OrgListView(ListView):
    model = Org
    template_name = 'orgs/org_list.html'

    def get_queryset(self):
        return Org.objects.active_orgs().order_by('-created')

class OrgUpdateView(LoginRequiredMixin, UpdateView):
    login_url = '/login/'
    template_name_suffix = '_update_create_form'
    model = Org
    form_class = OrgForm

@login_required
def org_publish(self, pk):
    org = get_object_or_404(Org, pk=pk)
    org.publish()
    return redirect('orgs:org_list')