# Generated by Django 3.0.6 on 2021-01-09 17:11

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('workers', '0007_auto_20201227_1750'),
    ]

    operations = [
        migrations.AlterModelOptions(
            name='availability',
            options={'verbose_name_plural': 'Availability'},
        ),
        migrations.RemoveField(
            model_name='availability',
            name='worker',
        ),
        migrations.AddField(
            model_name='availability',
            name='worker',
            field=models.ForeignKey(default=2, on_delete=django.db.models.deletion.CASCADE, related_name='worker', to='workers.Worker', verbose_name='Associated Worker'),
            preserve_default=False,
        ),
    ]
