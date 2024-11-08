# Generated by Django 5.0.6 on 2024-09-18 09:22

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0077_remove_recommendmealplan_end_week_and_more'),
    ]

    operations = [
        migrations.CreateModel(
            name='RequestRecommendMeals',
            fields=[
                ('request_id', models.AutoField(primary_key=True, serialize=False)),
                ('meal', models.JSONField()),
                ('date', models.DateField()),
                ('status', models.CharField(max_length=200)),
                ('price', models.IntegerField()),
                ('start_week', models.DateField()),
                ('end_week', models.DateField()),
                ('recommend_mealplan_id', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='listingsss1001', to='api.recommendmealplan')),
                ('user_id', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='listingsss1001', to='api.user')),
            ],
            options={
                'db_table': 'requestRecommends_meals',
            },
        ),
    ]
