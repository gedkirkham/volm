# Generated by Django 3.0.6 on 2020-11-16 20:10

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('workers', '0001_initial'),
        ('contact', '0002_auto_20201116_2005'),
    ]

    operations = [
        migrations.RenameModel(
            old_name='Contact',
            new_name='ContactInfo',
        ),
        migrations.AlterModelOptions(
            name='contactinfo',
            options={'verbose_name_plural': 'Contact Info'},
        ),
    ]
