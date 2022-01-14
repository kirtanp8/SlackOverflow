from django.db import models
from django.utils import timezone
from django.contrib.auth.models import User


class Status(models.Model):
    text = models.TextField()
    created_on = models.DateTimeField(default=timezone.now)
    image = models.CharField(max_length=500, blank=True)
    author = models.ForeignKey(
        "jwt_auth.User", related_name='status', on_delete=models.CASCADE)
