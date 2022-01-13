from jwt_auth.serializers import UserSerializer
from .common import Message, MessagesSerializer


class PopulatedMessagesSerializer(MessagesSerializer):
    author = UserSerializer()
    sent_to = UserSerializer()
