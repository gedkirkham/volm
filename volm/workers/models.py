from django.db import models
from django.contrib.auth import get_user_model
from django.urls import reverse
from django.utils.translation import gettext_lazy as _

from contact.models import Address, ContactInfo
from orgs.models import Org

User = get_user_model()

class AvailabilityDetail(models.Model):
    day = models.ManyToManyField("utils.Day", verbose_name=_("Day"))
    time_from = models.ManyToManyField("utils.Time", verbose_name=_("Time from"), related_name="time_from")
    time_to = models.ManyToManyField("utils.Time", verbose_name=_("Time to"), related_name="time_to")
    timezone = models.ForeignKey("utils.Timezone", verbose_name=_("Timezone"), null=True, on_delete=models.SET_NULL)
    worker = models.ForeignKey("Worker", verbose_name=_("Associated Worker"), on_delete=models.CASCADE, related_name='worker')

    class Meta:
        verbose_name_plural = 'Availability in detail'

choices_type = [
    ('wk', 'Week'),
    ('mo', 'Month')
]
class AvailabilityBasic(models.Model):
    created =  models.DateTimeField(auto_now_add=True, editable=False)
    hours = models.PositiveSmallIntegerField(_("Hours available"))
    modified = models.DateTimeField(auto_now=True)
    type = models.CharField(
            _("Type of availability"), 
            max_length=50,
            choices=choices_type,
        )
    user = models.ForeignKey(User, verbose_name=_("User"), on_delete=models.CASCADE)
    worker = models.ForeignKey("Worker", verbose_name=_("Workers advert"), on_delete=models.CASCADE)

    class Meta:
        verbose_name_plural = 'Availability as basic'

    def __str__(self):
        return "{} hours a {}".format(self.hours, dict(choices_type)[self.type])

choices_length = [
    ('0','0-1 year'),
    ('1','1-3 years'),
    ('2','3-6 years'),
    ('3','6-12 years'),
    ('4','12+ years'),
]
class Experience(models.Model):
    created =  models.DateTimeField(auto_now_add=True, editable=False)
    length = models.CharField(
            _("Length of experience"), 
            max_length=50,
            choices=choices_length,
        )
    main_skill = models.ForeignKey('WorkerTags', verbose_name=_("Main skill"), on_delete=models.CASCADE)
    modified = models.DateTimeField(auto_now=True)
    user = models.ForeignKey(User, help_text="User", on_delete=models.CASCADE)
    worker = models.ForeignKey("Worker", verbose_name=_("Workers advert"), on_delete=models.CASCADE)

    def __str__(self):
        return "{} {}".format(dict(choices_length)[self.length], _("experience"))

class WorkerManager(models.Manager):
    def active_orgs(self):
        return Worker.objects.filter(active=True)

class Worker(models.Model):
    active = models.BooleanField(default=True)
    created =  models.DateTimeField(auto_now_add=True, editable=False)
    description = models.TextField(max_length=10000, help_text="Advert description")
    main_skill = models.ForeignKey('WorkerTags', verbose_name=_("Main skill"), null=True, on_delete=models.SET_NULL)
    modified = models.DateTimeField(auto_now=True)
    remote_only = models.BooleanField(_("Remote only"), default=False)
    tags = models.ManyToManyField('WorkerTags', related_name='tags', help_text="Worker skill identifiers")
    title = models.CharField(max_length=100, help_text="Short title")
    user = models.ForeignKey(User, help_text="Workers associated user account", on_delete=models.CASCADE, related_name='user_account')
    objects = WorkerManager()

    class Meta:
        ordering = ['user']

    def __str__(self):
        return "{}: {}".format(self.pk, self.user.username)

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