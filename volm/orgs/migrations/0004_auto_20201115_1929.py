# Generated by Django 3.0.6 on 2020-11-15 19:29

from django.db import migrations, models
import orgs.models


class Migration(migrations.Migration):

    dependencies = [
        ('orgs', '0003_auto_20201017_1543'),
    ]

    operations = [
        migrations.AlterField(
            model_name='org',
            name='banner_image',
            field=models.ImageField(blank=True, upload_to=orgs.models.org_directory_path),
        ),
        migrations.AlterField(
            model_name='org',
            name='charity_id',
            field=models.CharField(help_text='Legally registered charity ID', max_length=100),
        ),
        migrations.AlterField(
            model_name='org',
            name='logo',
            field=models.ImageField(blank=True, upload_to=orgs.models.org_directory_path),
        ),
        migrations.AlterField(
            model_name='org',
            name='long_bio',
            field=models.CharField(blank=True, help_text='A detailed description', max_length=10000),
        ),
        migrations.AlterField(
            model_name='org',
            name='short_bio',
            field=models.CharField(blank=True, help_text='A short description', max_length=1000),
        ),
        migrations.AlterField(
            model_name='org',
            name='tag_line',
            field=models.CharField(help_text='One sentence description.', max_length=100),
        ),
        migrations.AlterField(
            model_name='org',
            name='tags',
            field=models.ManyToManyField(help_text='Short identifiers', related_name='tags', to='orgs.OrgTags'),
        ),
    ]
