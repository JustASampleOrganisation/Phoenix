# Generated by Django 4.1.1 on 2022-10-22 08:50

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('main', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='restaurant',
            name='description',
            field=models.TextField(default='lol', verbose_name='описание'),
        ),
    ]
