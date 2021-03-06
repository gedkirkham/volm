# Generated by Django 3.0.6 on 2020-12-10 10:17

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('orgs', '0004_auto_20201115_1929'),
        ('workers', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='worker',
            name='long_bio',
            field=models.TextField(default='', help_text='Workers long bio', max_length=1000),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='worker',
            name='short_bio',
            field=models.TextField(blank=True, help_text='Workers short bio', max_length=100),
        ),
        migrations.AlterField(
            model_name='worker',
            name='orgs',
            field=models.ManyToManyField(help_text='Organisations that the worker is linked to', related_name='associated_organisation', to='orgs.Org'),
        ),
        migrations.AlterField(
            model_name='worker',
            name='user',
            field=models.ForeignKey(help_text='Workers associated user account', on_delete=django.db.models.deletion.CASCADE, related_name='user_account', to=settings.AUTH_USER_MODEL),
        ),
        migrations.CreateModel(
            name='WorkerTags',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=50, unique=True)),
                ('created', models.DateTimeField(auto_now_add=True)),
                ('created_by', models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, to=settings.AUTH_USER_MODEL)),
            ],
            options={
                'verbose_name_plural': 'WorkerTags',
            },
        ),
    ]
