# Generated by Django 3.0.6 on 2021-01-10 18:55

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('contact', '0005_auto_20201214_2034'),
    ]

    operations = [
        migrations.AddField(
            model_name='address',
            name='user',
            field=models.ForeignKey(default=1, on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL, verbose_name='Users address'),
            preserve_default=False,
        ),
    ]