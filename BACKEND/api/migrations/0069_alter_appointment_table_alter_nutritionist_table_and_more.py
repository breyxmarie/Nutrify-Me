# Generated by Django 5.0.6 on 2024-08-17 10:23

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0068_alter_address_table_alter_appointment_table_and_more'),
    ]

    operations = [
        migrations.AlterModelTable(
            name='appointment',
            table='appointment',
        ),
        migrations.AlterModelTable(
            name='nutritionist',
            table='nutritionist',
        ),
        migrations.AlterModelTable(
            name='order',
            table='orders',
        ),
        migrations.AlterModelTable(
            name='user',
            table='user',
        ),
    ]
