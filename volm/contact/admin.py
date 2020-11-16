from django.contrib import admin
from .models import Address
from .models import ContactInfo

admin.site.register(Address)
admin.site.register(ContactInfo)
