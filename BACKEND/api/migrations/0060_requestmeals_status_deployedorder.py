# Generated by Django 5.0.6 on 2024-08-08 06:52

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0059_theme'),
    ]

    operations = [
        migrations.AddField(
            model_name='requestmeals',
            name='status',
            field=models.CharField(default='none', max_length=200),
            preserve_default=False,
        ),
        migrations.CreateModel(
            name='DeployedOrder',
            fields=[
                ('deployed_id', models.AutoField(primary_key=True, serialize=False)),
                ('order_details', models.JSONField()),
                ('date', models.DateField()),
                ('time', models.TimeField()),
                ('status', models.CharField(max_length=50)),
                ('order_id', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='listingsss1002', to='api.order')),
                ('user_id', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='listingsss1002', to='api.user')),
            ],
            options={
                'db_table': 'deployed_order',
            },
        ),
    ]
