# Generated by Django 5.0.6 on 2024-05-27 10:11

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0006_meeting'),
    ]

    operations = [
        migrations.CreateModel(
            name='ShopMealPlan',
            fields=[
                ('mealplan_id', models.AutoField(primary_key=True, serialize=False)),
                ('name', models.CharField(max_length=50)),
                ('image', models.ImageField(upload_to='Photos')),
                ('description', models.CharField(max_length=200)),
            ],
            options={
                'db_table': 'shop_meal_plan',
            },
        ),
        migrations.CreateModel(
            name='ShopMeal',
            fields=[
                ('meal_id', models.AutoField(primary_key=True, serialize=False)),
                ('type', models.CharField(max_length=30)),
                ('calories', models.IntegerField()),
                ('fat', models.IntegerField()),
                ('protein', models.IntegerField()),
                ('food', models.CharField(max_length=70)),
                ('image', models.CharField(max_length=100)),
                ('mealplan_id', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='listings', to='api.shopmealplan')),
            ],
            options={
                'db_table': 'shop_meal',
            },
        ),
    ]
