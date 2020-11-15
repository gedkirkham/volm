from django.db import models
from django.contrib.auth import get_user_model
from contact.models import Address, Contact
from orgs.models import Org

User = get_user_model()

class worker(models.Model):
    active = models.BooleanField(default=True)
    address = models.ForeignKey(Address, on_delete=models.SET_NULL, related_name='address')
    contact = models.ForeignKey(Contact, on_delete=models.SET_NULL, related_name='contact details')
    orgs = models.ManyToManyField(Org, on_delete=models.SET_NULL, related_name='associated organisation')
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='user account')
