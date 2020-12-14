# Generated by Django 3.0.6 on 2020-12-10 10:19

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('workers', '0002_auto_20201210_1017'),
    ]

    operations = [
        migrations.AlterField(
            model_name='worker',
            name='long_bio',
            field=models.TextField(help_text='Workers long bio', max_length=10000),
        ),
        migrations.AlterField(
            model_name='worker',
            name='short_bio',
            field=models.TextField(blank=True, help_text='Workers short bio', max_length=1000),
        ),
    ]