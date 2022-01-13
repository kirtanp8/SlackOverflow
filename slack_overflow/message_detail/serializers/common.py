from rest_framework import serializers
from ..models import Message
from jwt_auth.serializers import UserSerializer


class MessagesSerializer(serializers.ModelSerializer):
    class Meta:
        model = Message
        fields = '__all__'

        def __str__(self):
            return self
