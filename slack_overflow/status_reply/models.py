from django.db import models
from django.utils import timezone
from django.contrib.auth.models import User

# Create your models here.


class StatusReply(models.Model):
    message_sent = models.TextField()
    created_on = models.DateTimeField(default=timezone.now)
    author = models.ForeignKey(
        "jwt_auth.User",   on_delete=models.CASCADE)
    status_message = models.ForeignKey(
        "status.Status",
        related_name="status",
        on_delete=models.CASCADE
    )
