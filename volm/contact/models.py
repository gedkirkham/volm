from django.db import models

class Address(models.Model):
    city = models.CharField(max_length=100, blank=True)
    country = models.CharField(max_length=100, blank=True)
    postcode = models.CharField(max_length=20, blank=True)

    class Meta:
        verbose_name_plural = 'Address'

class ContactInfo(models.Model):
    phone_1 = models.CharField(max_length=20, blank=True)

    class Meta:
        verbose_name_plural = 'Contact Info'
