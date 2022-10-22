# Generated by Django 4.1.1 on 2022-10-22 19:24

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('main', '0007_product_legal_age_product_sub_description'),
    ]

    operations = [
        migrations.AddField(
            model_name='order',
            name='of_id',
            field=models.ForeignKey(default=1, null=True, on_delete=django.db.models.deletion.CASCADE, to='main.officiant', verbose_name='Официант'),
        ),
        migrations.AlterField(
            model_name='product',
            name='legal_age',
            field=models.BooleanField(default=False, verbose_name='18+?'),
        ),
    ]