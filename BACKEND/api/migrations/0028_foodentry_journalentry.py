# Generated by Django 5.0.6 on 2024-06-04 12:10

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0027_order_shipping_price'),
    ]

    operations = [
        migrations.CreateModel(
            name='FoodEntry',
            fields=[
                ('foodentry_id', models.AutoField(primary_key=True, serialize=False)),
                ('type', models.CharField(max_length=25)),
                ('food', models.CharField(max_length=100)),
                ('calories', models.IntegerField()),
                ('fat', models.IntegerField()),
                ('protein', models.IntegerField()),
                ('carbs', models.IntegerField()),
            ],
            options={
                'db_table': 'food_entry',
            },
        ),
        migrations.CreateModel(
            name='JournalEntry',
            fields=[
                ('journal_id', models.AutoField(primary_key=True, serialize=False)),
                ('date', models.DateField()),
                ('title', models.CharField(max_length=100)),
                ('entry', models.CharField(max_length=500)),
                ('systolic', models.IntegerField()),
                ('diastolic', models.IntegerField()),
            ],
            options={
                'db_table': 'journal_entry',
            },
        ),
    ]
