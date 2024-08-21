# Generated by Django 5.0.6 on 2024-08-08 10:06

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0061_remove_deployedorder_order_id_and_more'),
    ]

    operations = [
        migrations.AddField(
            model_name='deployedorder',
            name='address',
            field=models.JSONField(default=('none',)),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='deployedorder',
            name='order',
            field=models.JSONField(default=['none', 'none']),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='deployedorder',
            name='user',
            field=models.JSONField(default=['none', 'none']),
            preserve_default=False,
        ),
    ]