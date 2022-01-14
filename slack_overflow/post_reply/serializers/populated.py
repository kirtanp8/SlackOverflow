from .common import PostReplySerializer
from jwt_auth.serializers import UserSerializer


class PopulatedPostReplySerializer(PostReplySerializer):
    author = UserSerializer()
