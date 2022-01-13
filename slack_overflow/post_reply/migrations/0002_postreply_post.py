# Generated by Django 3.2.9 on 2021-12-04 19:01

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('posts', '0001_initial'),
        ('post_reply', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='postreply',
            name='post',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='posts', to='posts.post'),
        ),
    ]
