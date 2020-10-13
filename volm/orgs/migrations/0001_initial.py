# Generated by Django 3.0.6 on 2020-09-06 13:42

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='Org',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('active', models.BooleanField(default=True)),
                ('banner_image', models.ImageField(upload_to='org_directory_path')),
                ('created', models.DateTimeField(auto_now_add=True)),
                ('charity_id', models.CharField(max_length=100)),
                ('long_bio', models.CharField(max_length=10000)),
                ('logo', models.ImageField(upload_to='org_directory_path')),
                ('modified', models.DateTimeField(auto_now=True)),
                ('name', models.CharField(max_length=100, unique=True)),
                ('published', models.DateTimeField(null=True)),
                ('slug', models.SlugField(allow_unicode=True, unique=True)),
                ('short_bio', models.CharField(max_length=1000)),
                ('tag_line', models.CharField(max_length=100)),
                ('members', models.ManyToManyField(to=settings.AUTH_USER_MODEL)),
            ],
            options={
                'ordering': ['name'],
            },
        ),
        migrations.CreateModel(
            name='OrgMembers',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('org', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='memberships', to='orgs.Org')),
                ('user', models.ManyToManyField(related_name='users_orgs', to=settings.AUTH_USER_MODEL)),
            ],
        ),
    ]