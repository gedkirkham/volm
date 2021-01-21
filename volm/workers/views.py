from django.shortcuts import render, redirect
from django.views.generic import ListView, DetailView, UpdateView, DeleteView, CreateView
from django.urls import reverse_lazy, reverse
from django.contrib.auth.mixins import LoginRequiredMixin
from django.views.generic import TemplateView

from .models import Availability, Worker
from .forms import AvailabilityForm, AvailabilityFormSet, WorkerForm, initial
from contact.models import Address, ContactInfo

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
    fields = ['user', 'address', 'contact']

class WorkerDeleteView(LoginRequiredMixin, DeleteView):
    login_url = '/login/'
    success_url = reverse_lazy('workers:worker_list')
    model = Worker

class WorkerCreateView(LoginRequiredMixin, TemplateView):
    # availability_form_class = AvailabilityFormSet
    worker_form_class = WorkerForm
    login_url = '/login/'
    template_name = 'workers/worker_update_create_form.html'

    def post(self, request):
        post_data = request.POST or None

        worker_form = self.worker_form_class(post_data, prefix='worker')

        worker = None
        if worker_form.is_valid():
            worker = worker_form.save(commit=False)
            worker.user = request.user
            worker.save()

        # availability_form = self.availability_form_class(post_data, initial=initial, queryset=Availability.objects.filter(worker=worker))
        # context = self.get_context_data(worker_form=worker_form, availability_form=availability_form)
        context = self.get_context_data(worker_form=worker_form)

        # if availability_form.is_valid():
        #     for form in availability_form:
        #         availability = form.save(commit=False)
        #         availability.worker = worker
        #         availability.save()

        #         for day in form.cleaned_data.get('day'):
        #             availability.day.add(day)
                    
        #         for time_from in form.cleaned_data.get('time_from'):
        #             availability.time_from.add(time_from)

        #         for time_to in form.cleaned_data.get('time_to'):
        #             availability.time_to.add(time_to)

        # if worker_form.is_valid() and availability_form.is_valid():
        if worker_form.is_valid():
            return redirect(reverse_lazy('workers:worker_detail', kwargs={ 'pk': worker.pk }))

        return self.render_to_response(context)

    def get(self, request, *args, **kwargs):
        return self.post(request, *args, **kwargs)
