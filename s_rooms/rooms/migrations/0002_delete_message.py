# Generated by Django 5.0 on 2024-03-30 16:13

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ("rooms", "0001_initial"),
    ]

    operations = [
        migrations.DeleteModel(
            name="Message",
        ),
    ]
