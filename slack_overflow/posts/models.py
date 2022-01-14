from django.db import models
from django.utils import timezone
from django.contrib.auth.models import User
# Create your models here.


class Post(models.Model):
    text = models.TextField()
    created_on = models.DateTimeField(default=timezone.now)
    image = models.CharField(max_length=500, blank=True)
    image_two = models.CharField(max_length=500, blank=True)
    image_three = models.CharField(max_length=500, blank=True)
    image_four = models.CharField(max_length=500, blank=True)
    author = models.ForeignKey("jwt_auth.User", on_delete=models.CASCADE)
    post_reply = models.ManyToManyField(
        "post_reply.PostReply", related_name="post_reply", blank=True)

    def __str__(self):
        return self.text
