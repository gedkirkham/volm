from django.db import models

class Address(models.Model):
    postcode = models.CharField(max_length=20, blank=True)

    class Meta:
        verbose_name_plural = 'Address'

class ContactInfo(models.Model):
    phone_1 = models.CharField(max_length=20, blank=True)

    class Meta:
        verbose_name_plural = 'Contact Info'
