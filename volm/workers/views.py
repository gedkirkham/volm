from django.shortcuts import render
from django.views.generic import ListView, DetailView, UpdateView, DeleteView, CreateView
from django.urls import reverse_lazy
from django.contrib.auth.mixins import LoginRequiredMixin
from .models import Worker
from .forms import WorkerForm

class WorkerListView(ListView):
    template_name = 'workers/worker_list.html'
    model = Worker

    def get_queryset(self):
        return Worker.objects.filter(active=True).order_by('-created')

class WorkerDetailView(DetailView):
    template_name = 'workers/worker_detail.html'
    model = Worker

class WorkerUpdateView(LoginRequiredMixin, UpdateView):
    template_name = "workers/worker_update_create_form.html"
    model = Worker

class WorkerDeleteView(LoginRequiredMixin, DeleteView):
    login_url = '/login/'
    success_url = reverse_lazy('workers:worker_list')
    model = Worker

class WorkerCreateView(LoginRequiredMixin, CreateView):
    login_url = '/login/'
    redirect_field_name = 'workers/worker_detail.html'
    model = Worker
    form_class = WorkerForm
    template_name_suffix = '_update_create_form'
