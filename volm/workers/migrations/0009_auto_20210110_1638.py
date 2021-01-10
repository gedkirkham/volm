# Generated by Django 3.0.6 on 2021-01-10 16:38

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('utils', '0001_initial'),
        ('workers', '0008_auto_20210109_1711'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='availability',
            name='timezone',
        ),
        migrations.AddField(
            model_name='availability',
            name='timezone',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, to='utils.Timezone', verbose_name='Timezone'),
        ),
    ]
