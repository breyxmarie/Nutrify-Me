# Generated by Django 5.0.6 on 2024-05-25 10:32

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0005_appointment'),
    ]

    operations = [
        migrations.CreateModel(
            name='Meeting',
            fields=[
                ('video_id', models.AutoField(primary_key=True, serialize=False)),
                ('meeting_id', models.CharField(max_length=100)),
            ],
            options={
                'db_table': 'meeting',
            },
        ),
    ]
