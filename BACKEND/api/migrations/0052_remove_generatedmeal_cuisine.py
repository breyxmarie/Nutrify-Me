# Generated by Django 5.0.6 on 2024-07-23 06:18

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0051_generatedmeal_height_generatedmeal_weight'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='generatedmeal',
            name='cuisine',
        ),
    ]
