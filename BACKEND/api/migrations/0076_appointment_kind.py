# Generated by Django 5.0.6 on 2024-09-16 08:19

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0075_journalentry_meal_plan'),
    ]

    operations = [
        migrations.AddField(
            model_name='appointment',
            name='kind',
            field=models.CharField(default='Approved', max_length=150),
            preserve_default=False,
        ),
    ]