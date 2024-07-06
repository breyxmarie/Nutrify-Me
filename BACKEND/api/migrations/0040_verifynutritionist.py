# Generated by Django 5.0.6 on 2024-07-01 09:22

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0039_alter_scheduledeck_nutritionist_id'),
    ]

    operations = [
        migrations.CreateModel(
            name='VerifyNutritionist',
            fields=[
                ('verify_id', models.AutoField(primary_key=True, serialize=False)),
                ('username', models.CharField(max_length=30)),
                ('password', models.CharField(max_length=30)),
                ('first_name', models.CharField(max_length=30)),
                ('last_name', models.CharField(max_length=30)),
                ('license_pic', models.CharField(max_length=300)),
            ],
            options={
                'db_table': 'verify_nutritionist',
            },
        ),
    ]