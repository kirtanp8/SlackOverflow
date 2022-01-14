
from .common import StatusSerializer
from status_reply.serializers.populated import PopulatedStatusReplySerializer
from jwt_auth.serializers import UserSerializer


class PopulatedStatusSerializer(StatusSerializer):
    status = PopulatedStatusReplySerializer(many=True)
    author = UserSerializer()
