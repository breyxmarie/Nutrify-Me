# Generated by Django 5.0.6 on 2024-05-28 14:04

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0012_shopmealplan_end_week_shopmealplan_start_week'),
    ]

    operations = [
        migrations.AlterField(
            model_name='shopmealplan',
            name='end_week',
            field=models.DateField(auto_now=True),
        ),
        migrations.AlterField(
            model_name='shopmealplan',
            name='start_week',
            field=models.DateField(auto_now=True),
        ),
    ]
