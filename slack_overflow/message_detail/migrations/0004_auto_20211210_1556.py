# Generated by Django 3.2.9 on 2021-12-10 15:56

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('message_detail', '0003_auto_20211210_1550'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='message',
            name='author',
        ),
        migrations.AddField(
            model_name='message',
            name='author',
            field=models.ForeignKey(default=1, on_delete=django.db.models.deletion.CASCADE, related_name='author', to='jwt_auth.user'),
            preserve_default=False,
        ),
        migrations.DeleteModel(
            name='UserDetails',
        ),
    ]
