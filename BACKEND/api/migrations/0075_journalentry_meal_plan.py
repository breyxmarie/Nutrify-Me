# Generated by Django 5.0.6 on 2024-09-13 13:57

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0074_recommendmealplan_recommendmeal'),
    ]

    operations = [
        migrations.AddField(
            model_name='journalentry',
            name='meal_plan',
            field=models.CharField(default='none', max_length=500),
            preserve_default=False,
        ),
    ]