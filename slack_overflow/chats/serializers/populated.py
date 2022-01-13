from message_detail.serializers.common import MessagesSerializer
from .common import ChatSerializer


class PopulatedChatSerializer(ChatSerializer):
    message_detail = MessagesSerializer(many=True)
