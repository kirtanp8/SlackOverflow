from django.core.exceptions import PermissionDenied
from rest_framework import permissions
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.exceptions import NotFound
from rest_framework.permissions import IsAuthenticated
from .models import StatusReply
from .serializers.common import StatusReplySerializer


class StatusReplyListView(APIView):

    permission_classes = (IsAuthenticated, )

    def post(self, request):
        request.data['author'] = request.user.id
        status_reply_to_add = StatusReplySerializer(data=request.data)
        if status_reply_to_add.is_valid():
            status_reply_to_add.save()
            return Response(status_reply_to_add.data, status=status.HTTP_201_CREATED)
        return Response(status_reply_to_add.errors, status=status.HTTP_422_UNPROCESSABLE_ENTITY)


class StatusReplyDetailView(APIView):

    permission_classes = (IsAuthenticated, )

    def get_status(self, pk):
        try:
            status = StatusReply.objects.get(pk=pk)
            return status
        except StatusReply.DoesNotExist:
            raise NotFound(detail="Review Does Not Exist")

    def delete(self, request, pk):
        status_to_delete = self.get_status(pk=pk)
        if status_to_delete.author != request.user:
            raise PermissionDenied(detail="Unauthorized")
        status_to_delete.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

    def put(self, request, pk):
        status_to_update = self.get_Status(pk=pk)
        updated_status = StatusReplySerializer(
            status_to_update, data=request.data)
        if updated_status.is_valid():
            updated_status.save()
            return Response(updated_status.data, status=status.HTTP_202_ACCEPTED)
        return Response(updated_status.errors, status=status.HTTP_422_UNPROCESSABLE_ENTITY)
