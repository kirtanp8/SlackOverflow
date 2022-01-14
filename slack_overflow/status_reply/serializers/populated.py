
from .common import StatusReplySerializer
from jwt_auth.serializers import UserSerializer


class PopulatedStatusReplySerializer(StatusReplySerializer):
    author = UserSerializer()
