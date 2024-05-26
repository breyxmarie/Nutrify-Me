# Generated by Django 5.0.6 on 2024-05-25 08:39

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0005_appointment'),
    ]

    operations = [
        migrations.CreateModel(
            name='VideoCall',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('meeting_id', models.CharField(max_length=100)),
            ],
            options={
                'db_table': 'VideoCall',
            },
        ),
    ]
