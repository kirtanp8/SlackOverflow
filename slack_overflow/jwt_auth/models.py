from django.contrib.auth.models import AbstractUser
from django.db import models


class User(AbstractUser):

    # custom fields here...
    first_name = models.CharField(max_length=60, blank=True)
    last_name = models.CharField(max_length=60, blank=True)
    image = models.CharField(max_length=500, blank=True,
                             default='https://img1.pnghut.com/20/16/4/fR6d8RNp4R/smiley-happiness-watercolor-facial-expression-emoticon.jpg')
    chat_field = models.ManyToManyField("chats.Chats", blank=True)
