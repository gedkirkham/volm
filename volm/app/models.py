from django.conf import settings
from django.db import models
# from django.contrib.auth import get_user_model

class OrgAdvert(models.Model):
    active = models.BooleanField(default=True)
    address = models.ForeignKey('UserAddress', on_delete=models.SET_NULL, blank=True, null=True)
    created = models.DateTimeField(auto_now_add=True)
    description = models.CharField(max_length=20000)
    end_date = models.DateTimeField()
    modified = models.DateTimeField(auto_now=True)
    last_modified_by = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.SET_NULL, blank=True, null=True)
    organisation = models.OneToOneField('Organisation', on_delete=models.CASCADE)
    start_date = models.DateTimeField()
    tag_line = models.CharField(max_length=100)
    title = models.CharField(max_length=100)

class OrgAddress(models.Model):
    active = models.BooleanField(default=True)
    address_1 = models.CharField(max_length=100)
    address_2 = models.CharField(max_length=100)
    address_3 = models.CharField(max_length=100)
    address_4 = models.CharField(max_length=100)
    address_5 = models.CharField(max_length=100)
    address_postcode = models.CharField(max_length=100)
    created = models.DateTimeField(auto_now_add=True)
    modified = models.DateTimeField(auto_now=True)
    organisation = models.ForeignKey('Organisation', on_delete=models.CASCADE)

class OrgContact(models.Model):
    active = models.BooleanField(default=True)
    created = models.DateTimeField(auto_now_add=True)
    email_1 = models.CharField(max_length=100)
    modified = models.DateTimeField(auto_now=True)
    organisation = models.ForeignKey('Organisation', on_delete=models.CASCADE)
    phone_1_ext = models.IntegerField()
    phone_1_num = models.IntegerField()

def organisation_directory_path(instance, filename):
    org = Organisation.objects.filter(user_profile=instance.user.id)
    upload = 'org_{0}/{1}'.format(org, filename) # Will not work. Need to locate users assigned organisation

class Organisation(models.Model):
    active = models.BooleanField(default=True)
    banner_image = models.ImageField(upload_to=organisation_directory_path)
    created =  models.DateTimeField(auto_now_add=True)
    charity_id = models.CharField(max_length=100)
    short_bio = models.CharField(max_length=1000)
    long_bio = models.CharField(max_length=10000)
    tag_line = models.CharField(max_length=100)
    modified = models.DateTimeField(auto_now=True)
    logo = models.ImageField(upload_to=organisation_directory_path)
    name = models.CharField(max_length=100)

class Skills(models.Model):
    created = models.DateTimeField(auto_now_add=True)
    name = models.CharField(max_length=100)

class Time(models.Model):
    created = models.DateTimeField(auto_now_add=True)
    from_time = models.IntegerField()
    to_time = models.IntegerField()

class TravelMode(models.Model):
    created = models.DateTimeField(auto_now_add=True)
    mode = models.CharField(max_length=100)

def user_directory_path(instance, filename):
    upload - 'user_{0}/{1}'.format(instance.user.id, filename)

class UserProfile(models.Model):
    created = models.DateTimeField(auto_now_add=True)
    modified = models.DateTimeField(auto_now=True)
    organiser = models.ManyToManyField(Organisation)
    profile_pic = models.ImageField(upload_to=user_directory_path)
    user = models.OneToOneField(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    worker = models.ForeignKey('Worker', on_delete=models.CASCADE)

class UserAddress(models.Model):
    active = models.BooleanField(default=True)
    address_1 = models.CharField(max_length=100)
    address_2 = models.CharField(max_length=100)
    address_3 = models.CharField(max_length=100)
    address_4 = models.CharField(max_length=100)
    address_5 = models.CharField(max_length=100)
    address_postcode = models.CharField(max_length=100)
    created = models.DateTimeField(auto_now_add=True)
    modified = models.DateTimeField(auto_now=True)
    user = models.OneToOneField(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)

class UserContact(models.Model):
    active = models.BooleanField(default=True)
    created = models.DateTimeField(auto_now_add=True)
    modified = models.DateTimeField(auto_now=True)
    phone_1_ext = models.IntegerField()
    phone_1_num = models.IntegerField()
    user = models.OneToOneField(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)

class Worker(models.Model):
    active = models.BooleanField()
    availability_day = models.CharField(max_length=100)
    availability_time = models.ManyToManyField(Time)
    created = models.DateTimeField(auto_now_add=True)
    modified = models.DateTimeField(auto_now=True)
    skills = models.ManyToManyField(Skills)
    travel_mode = models.ManyToManyField(TravelMode)
    travel_distance = models.IntegerField()
    user = models.OneToOneField(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    remote = models.BooleanField()

class WorkerAdvert(models.Model):
    active = models.BooleanField(default=True)
    address = models.OneToOneField('UserAddress', on_delete=models.SET_NULL, blank=True, null=True)
    created = models.DateTimeField(auto_now_add=True)
    description = models.CharField(max_length=20000)
    end_date = models.DateTimeField()
    modified = models.DateTimeField(auto_now=True)
    last_modified_by = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.SET_NULL, blank=True, null=True)
    start_date = models.DateTimeField()
    tag_line = models.CharField(max_length=100)
    title = models.CharField(max_length=100)