from django.db import models
from django.utils.translation import gettext_lazy as _

class Day(models.Model):
    day = models.CharField(_("Day"), max_length=50)

    def __str__(self):
        return self.day

class Time(models.Model):
    hour = models.CharField(_("Hour"), max_length=50)

    def __str__(self):
        return self.hour

class Timezone(models.Model):
    timezone = models.CharField(_("Timezone"), max_length=50)

    def __str__(self):
        return self.timezone
