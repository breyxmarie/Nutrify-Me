# Generated by Django 5.0.6 on 2024-06-01 09:49

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0017_alter_shopmeal_table'),
    ]

    operations = [
        migrations.AddField(
            model_name='shopmealplan',
            name='price',
            field=models.IntegerField(default=0),
            preserve_default=False,
        ),
    ]
