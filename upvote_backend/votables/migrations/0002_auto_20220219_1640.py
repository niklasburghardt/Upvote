# Generated by Django 3.2.12 on 2022-02-19 15:40

from django.db import migrations, models
import django.utils.timezone


class Migration(migrations.Migration):

    dependencies = [
        ('votables', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='votable',
            name='created',
            field=models.DateTimeField(auto_now_add=True, default=django.utils.timezone.now),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='votable',
            name='updated',
            field=models.DateTimeField(auto_now=True),
        ),
    ]