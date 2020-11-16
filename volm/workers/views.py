from django.shortcuts import render
from django.views.generic import ListView, DetailView
from .models import Worker

class WorkerListView(ListView):
    template_name = 'workers/worker_list.html'
    model = Worker

    def get_queryset(self):
        return Worker.objects.filter(active=True).order_by('-created')

class WorkerDetailView(DetailView):
    template_name = 'workers/worker_detail.html'
    model = Worker