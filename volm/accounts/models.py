
from django.db import models
from django.contrib import auth
from django.contrib.auth import get_user_model
from django.utils.translation import gettext_lazy as _

UserModel = get_user_model()
class Address(models.Model):
    city = models.CharField(max_length=100)
    country = models.CharField(max_length=100)
    line_1 = models.CharField(max_length=100)
    line_2 = models.CharField(max_length=100, blank=True)
    postcode = models.CharField(max_length=20)
    user = models.ForeignKey(UserModel, on_delete=models.CASCADE)

    class Meta:
        verbose_name_plural = 'Addresses'

    def __str__(self):
        return "{}, {}, {}, {}, {}".format(self.line_1, self.line_2, self.city, self.country, self.postcode)

class ContactInfo(models.Model):
    phone_1 = models.CharField(max_length=20, blank=True)
    user =  models.ForeignKey(UserModel, verbose_name=_("Users contact info"), on_delete=models.CASCADE)

    class Meta:
        verbose_name_plural = 'Contact Info'

    def __str__(self):
        return "{}".format(self.phone_1)


class User(auth.models.User, auth.models.PermissionsMixin):
    def __str__(self):
        return "@{}".format(self.username)