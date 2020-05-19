# Generated by Django 3.0.6 on 2020-05-19 18:39

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('app', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='OrgAddress',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('active', models.BooleanField(default=True)),
                ('address_1', models.CharField(max_length=100)),
                ('address_2', models.CharField(max_length=100)),
                ('address_3', models.CharField(max_length=100)),
                ('address_4', models.CharField(max_length=100)),
                ('address_5', models.CharField(max_length=100)),
                ('address_postcode', models.CharField(max_length=100)),
                ('created', models.DateTimeField(auto_now_add=True)),
                ('modified', models.DateTimeField(auto_now=True)),
                ('organisation', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='app.Organisation')),
            ],
        ),
        migrations.CreateModel(
            name='OrgAdvert',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('active', models.BooleanField(default=True)),
                ('created', models.DateTimeField(auto_now_add=True)),
                ('description', models.CharField(max_length=20000)),
                ('end_date', models.DateTimeField()),
                ('modified', models.DateTimeField(auto_now=True)),
                ('start_date', models.DateTimeField()),
                ('tag_line', models.CharField(max_length=100)),
                ('title', models.CharField(max_length=100)),
            ],
        ),
        migrations.CreateModel(
            name='OrgContact',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('active', models.BooleanField(default=True)),
                ('created', models.DateTimeField(auto_now_add=True)),
                ('email_1', models.CharField(max_length=100)),
                ('modified', models.DateTimeField(auto_now=True)),
                ('phone_1_ext', models.IntegerField()),
                ('phone_1_num', models.IntegerField()),
                ('organisation', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='app.Organisation')),
            ],
        ),
        migrations.CreateModel(
            name='UserAddress',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('active', models.BooleanField(default=True)),
                ('address_1', models.CharField(max_length=100)),
                ('address_2', models.CharField(max_length=100)),
                ('address_3', models.CharField(max_length=100)),
                ('address_4', models.CharField(max_length=100)),
                ('address_5', models.CharField(max_length=100)),
                ('address_postcode', models.CharField(max_length=100)),
                ('created', models.DateTimeField(auto_now_add=True)),
                ('modified', models.DateTimeField(auto_now=True)),
                ('user', models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
            ],
        ),
        migrations.CreateModel(
            name='UserContact',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('active', models.BooleanField(default=True)),
                ('created', models.DateTimeField(auto_now_add=True)),
                ('modified', models.DateTimeField(auto_now=True)),
                ('phone_1_ext', models.IntegerField()),
                ('phone_1_num', models.IntegerField()),
                ('user', models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
            ],
        ),
        migrations.CreateModel(
            name='WorkerAdvert',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('active', models.BooleanField(default=True)),
                ('created', models.DateTimeField(auto_now_add=True)),
                ('description', models.CharField(max_length=20000)),
                ('end_date', models.DateTimeField()),
                ('modified', models.DateTimeField(auto_now=True)),
                ('start_date', models.DateTimeField()),
                ('tag_line', models.CharField(max_length=100)),
                ('title', models.CharField(max_length=100)),
                ('address', models.OneToOneField(blank=True, null=True, on_delete=django.db.models.deletion.SET_NULL, to='app.UserAddress')),
                ('last_modified_by', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.SET_NULL, to=settings.AUTH_USER_MODEL)),
            ],
        ),
        migrations.RemoveField(
            model_name='advert',
            name='address',
        ),
        migrations.RemoveField(
            model_name='advert',
            name='last_modified_by',
        ),
        migrations.RemoveField(
            model_name='advert',
            name='organisation',
        ),
        migrations.RemoveField(
            model_name='contact',
            name='organisation',
        ),
        migrations.RemoveField(
            model_name='contact',
            name='user',
        ),
        migrations.AddField(
            model_name='worker',
            name='user',
            field=models.OneToOneField(default=1, on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL),
            preserve_default=False,
        ),
        migrations.AlterField(
            model_name='userprofile',
            name='user',
            field=models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL),
        ),
        migrations.DeleteModel(
            name='Address',
        ),
        migrations.DeleteModel(
            name='Advert',
        ),
        migrations.DeleteModel(
            name='Contact',
        ),
        migrations.AddField(
            model_name='orgadvert',
            name='address',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.SET_NULL, to='app.UserAddress'),
        ),
        migrations.AddField(
            model_name='orgadvert',
            name='last_modified_by',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.SET_NULL, to=settings.AUTH_USER_MODEL),
        ),
        migrations.AddField(
            model_name='orgadvert',
            name='organisation',
            field=models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, to='app.Organisation'),
        ),
    ]
