# Generated by Django 5.0.6 on 2024-06-29 10:33

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0034_scheduledeck'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='nutritionist',
            name='schedule_day',
        ),
    ]
