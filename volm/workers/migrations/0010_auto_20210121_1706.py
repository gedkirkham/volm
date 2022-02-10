# Generated by Django 3.1.5 on 2021-01-21 17:06

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('workers', '0009_auto_20210110_1638'),
    ]

    operations = [
        migrations.CreateModel(
            name='JobTitle',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('title', models.CharField(max_length=50, unique=True, verbose_name='Job Title')),
            ],
        ),
        migrations.AddField(
            model_name='worker',
            name='skill',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, to='workers.jobtitle', verbose_name='Area of skill'),
        ),
    ]