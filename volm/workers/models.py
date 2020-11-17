from django.db import models
from django.contrib.auth import get_user_model
from django.urls import reverse
from contact.models import Address, ContactInfo
from orgs.models import Org

User = get_user_model()

class WorkerManager(models.Manager):
    def active_orgs(self):
        return Worker.objects.filter(active=True)

class Worker(models.Model):
    active = models.BooleanField(default=True)
    address = models.ForeignKey(Address, on_delete=models.SET_NULL, null=True, related_name='address')
    contact = models.ForeignKey(ContactInfo, on_delete=models.SET_NULL, null=True, related_name='contact_details')
    created =  models.DateTimeField(auto_now_add=True, editable=False)
    modified = models.DateTimeField(auto_now=True)
    orgs = models.ManyToManyField(Org, related_name='associated_organisation')
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='user_account')
    objects = WorkerManager()

    class Meta:
        ordering = ['user']

    def get_absolute_url(self):
        return reverse("workers:worker_detail", kwargs={ 'pk': self.pk })