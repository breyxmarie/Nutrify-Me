# Generated by Django 5.0.6 on 2024-07-23 05:11

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0050_generatedmeal_activity_generatedmeal_age_and_more'),
    ]

    operations = [
        migrations.AddField(
            model_name='generatedmeal',
            name='height',
            field=models.IntegerField(default=0),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='generatedmeal',
            name='weight',
            field=models.IntegerField(default=0),
            preserve_default=False,
        ),
    ]
