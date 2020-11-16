# Generated by Django 3.0.7 on 2020-10-17 15:43

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('orgs', '0002_orgtags'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='orgtags',
            name='org',
        ),
        migrations.AddField(
            model_name='org',
            name='tags',
            field=models.ManyToManyField(null=True, related_name='tags', to='orgs.OrgTags'),
        ),
        migrations.AlterField(
            model_name='orgtags',
            name='name',
            field=models.CharField(max_length=50, unique=True),
        ),
    ]