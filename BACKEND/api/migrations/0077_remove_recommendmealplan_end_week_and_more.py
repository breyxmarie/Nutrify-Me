# Generated by Django 5.0.6 on 2024-09-18 09:14

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0076_appointment_kind'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='recommendmealplan',
            name='end_week',
        ),
        migrations.RemoveField(
            model_name='recommendmealplan',
            name='start_week',
        ),
        migrations.AddField(
            model_name='requestmeals',
            name='end_week',
            field=models.DateField(default='2024-05-06'),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='requestmeals',
            name='start_week',
            field=models.DateField(default='2024-07-06'),
            preserve_default=False,
        ),
        migrations.AlterField(
            model_name='foodentry',
            name='food',
            field=models.CharField(max_length=5000),
        ),
     
    ]
