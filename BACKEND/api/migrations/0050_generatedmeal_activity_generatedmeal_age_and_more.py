# Generated by Django 5.0.6 on 2024-07-15 11:35

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0049_generatedmeal_name'),
    ]

    operations = [
        migrations.AddField(
            model_name='generatedmeal',
            name='activity',
            field=models.CharField(default='none', max_length=40),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='generatedmeal',
            name='age',
            field=models.IntegerField(default=1),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='generatedmeal',
            name='allergen',
            field=models.CharField(default='none', max_length=50),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='generatedmeal',
            name='cuisine',
            field=models.CharField(default=['none', 'none'], max_length=50),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='generatedmeal',
            name='diet',
            field=models.CharField(default='none', max_length=40),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='generatedmeal',
            name='gender',
            field=models.CharField(default='none', max_length=40),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='generatedmeal',
            name='goal',
            field=models.CharField(default='none', max_length=40),
            preserve_default=False,
        ),
    ]
