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
    short_bio = models.TextField(max_length=1000, blank=True, help_text="Workers short bio")
    long_bio = models.TextField(max_length=10000, help_text="Workers long bio")
    modified = models.DateTimeField(auto_now=True)
    orgs = models.ManyToManyField(Org, related_name='associated_organisation', help_text="Organisations that the worker is linked to")
    tags = models.ManyToManyField('WorkerTags', related_name='tags', help_text="Worker skill identifiers")
    user = models.ForeignKey(User, help_text="Workers associated user account", on_delete=models.CASCADE, related_name='user_account')
    objects = WorkerManager()

    class Meta:
        ordering = ['user']

    def __str__(self):
        return self.user.username

    def get_absolute_url(self):
        return reverse("workers:worker_detail", kwargs={ 'pk': self.pk })

class WorkerTags(models.Model):
    name = models.CharField(max_length=50, unique=True)
    created = models.DateTimeField(auto_now_add=True)
    created_by = models.ForeignKey(User, on_delete=models.SET_NULL, null=True)

    class Meta:
        verbose_name_plural = 'WorkerTags'

    def __str__(self):
        return self.name