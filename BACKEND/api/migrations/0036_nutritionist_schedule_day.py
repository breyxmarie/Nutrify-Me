# Generated by Django 5.0.6 on 2024-06-29 10:34

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0035_remove_nutritionist_schedule_day'),
    ]

    operations = [
        migrations.AddField(
            model_name='nutritionist',
            name='schedule_day',
            field=models.JSONField(default=['Monday', 'Saturday']),
            preserve_default=False,
        ),
    ]
