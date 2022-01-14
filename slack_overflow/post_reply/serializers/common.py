from rest_framework import serializers
from ..models import PostReply


class PostReplySerializer(serializers.ModelSerializer):
    class Meta:
        model = PostReply
        fields = '__all__'

        # def __str__(self):
        #     return self
