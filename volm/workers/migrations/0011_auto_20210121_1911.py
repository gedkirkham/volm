# Generated by Django 3.1.5 on 2021-01-21 19:11

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('workers', '0010_auto_20210121_1706'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='worker',
            name='long_bio',
        ),
        migrations.RemoveField(
            model_name='worker',
            name='short_bio',
        ),
        migrations.RemoveField(
            model_name='worker',
            name='skill',
        ),
        migrations.AddField(
            model_name='worker',
            name='description',
            field=models.TextField(default='', help_text='Advert description', max_length=10000),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='worker',
            name='main_skill',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, to='workers.workertags', verbose_name='Main skill'),
        ),
        migrations.AddField(
            model_name='worker',
            name='remote_only',
            field=models.BooleanField(default=False, verbose_name='Remote only'),
        ),
    ]
