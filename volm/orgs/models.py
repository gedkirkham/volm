from django.conf import settings
from django.db import models
from django.urls import reverse
from django.utils import timezone
from django.utils.text import slugify
from django.contrib.auth import get_user_model

User = get_user_model()

class OrgManager(models.Manager):
    def active_orgs(self):
        return Org.objects.filter(active=True)

class Org(models.Model):
    active = models.BooleanField(default=True)
    banner_image = models.ImageField(upload_to='org_directory_path')
    created =  models.DateTimeField(auto_now_add=True)
    charity_id = models.CharField(max_length=100)
    long_bio = models.CharField(max_length=10000)
    logo = models.ImageField(upload_to='org_directory_path')
    members = models.ManyToManyField(User)
    modified = models.DateTimeField(auto_now=True)
    name = models.CharField(max_length=100, unique=True)
    published = models.DateTimeField(null=True)
    slug = models.SlugField(allow_unicode=True, unique=True)
    short_bio = models.CharField(max_length=1000)
    tags = models.ManyToManyField('OrgTags', related_name='tags')
    tag_line = models.CharField(max_length=100)
    objects = OrgManager()

    class Meta:
        ordering = ['name']

    def get_absolute_url(self):
        return reverse("orgs:org_detail", kwargs={ 'pk': self.pk })

    def publish(self):
        self.published = timezone.now()
        self.save()

    def save(self, *args, **kwargs):
        self.slug = slugify(self.name)
        super().save(*args, **kwargs)

    def __str__(self):
        return self.name

class OrgMembers(models.Model):
    org = models.ForeignKey('Org', on_delete=models.CASCADE, related_name='memberships')
    user = models.ManyToManyField(User, related_name="users_orgs")

class OrgTags(models.Model):
    name = models.CharField(max_length=50, unique=True)
    created = models.DateTimeField(auto_now_add=True)
    created_by = models.ForeignKey(User, on_delete=models.SET_NULL, null=True)

    class Meta:
        verbose_name_plural = 'OrgTags'

    def __str__(self):
        return self.name

def org_directory_path(instance, filename):
    org = Org.objects.filter(user_profile=instance.user.id)
    upload = 'org_{0}/{1}'.format(org, filename) # Will not work. Need to locate users assigned org
    return upload

