# from SlackOverflow.slack_overflow.jwt_auth.models import User
from post_reply.serializers.common import PostReplySerializer
from .common import PostSerializer
from jwt_auth.serializers import UserSerializer


class PopulatedPostSerializer(PostSerializer):
    post_reply = PostReplySerializer(many=True)
    author = UserSerializer()
