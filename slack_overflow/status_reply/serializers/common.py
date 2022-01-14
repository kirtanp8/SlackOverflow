from rest_framework import serializers
from ..models import StatusReply


class StatusReplySerializer(serializers.ModelSerializer):
    class Meta:
        model = StatusReply
        fields = '__all__'
