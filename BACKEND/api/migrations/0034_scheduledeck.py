# Generated by Django 5.0.6 on 2024-06-29 04:24

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0033_user_image'),
    ]

    operations = [
        migrations.CreateModel(
            name='ScheduleDeck',
            fields=[
                ('schedule_id', models.AutoField(primary_key=True, serialize=False)),
                ('time', models.TimeField()),
                ('date', models.DateField()),
                ('type', models.CharField(max_length=20)),
                ('nutritionist_id', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='listingsss3', to='api.journalentry')),
            ],
            options={
                'db_table': 'schedule_deck',
            },
        ),
    ]