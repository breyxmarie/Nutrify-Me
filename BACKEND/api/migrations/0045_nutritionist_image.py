# Generated by Django 5.0.6 on 2024-07-02 10:36

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0044_verifynutritionist_license_id'),
    ]

    operations = [
        migrations.AddField(
            model_name='nutritionist',
            name='image',
            field=models.CharField(default='http://127.0.0.1:8000/Photos/profile.png', max_length=150),
            preserve_default=False,
        ),
    ]
