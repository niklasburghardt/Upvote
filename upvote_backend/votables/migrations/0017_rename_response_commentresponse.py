# Generated by Django 3.2.12 on 2022-03-25 13:41

from django.conf import settings
from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('votables', '0016_response'),
    ]

    operations = [
        migrations.RenameModel(
            old_name='Response',
            new_name='CommentResponse',
        ),
    ]
