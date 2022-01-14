from .models import Status
from .serializers.common import StatusSerializer
from .serializers.populated import PopulatedStatusSerializer
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.exceptions import NotFound
from rest_framework.permissions import IsAuthenticatedOrReadOnly


class StatusListView(APIView):
    permission_classes = (IsAuthenticatedOrReadOnly, )

    def get(self, request):
        status_message = Status.objects.all()
        serialized_status_message = PopulatedStatusSerializer(
            status_message, many=True)
        return Response(serialized_status_message.data, status=status.HTTP_200_OK)

    def post(self, request):
        request.data['author'] = request.user.id
        status_added = StatusSerializer(data=request.data)
        if status_added.is_valid():
            status_added.save()
            return Response(status_added.data, status=status.HTTP_201_CREATED)
        return Response(status_added.errors, status=status.HTTP_422_UNPROCESSABLE_ENTITY)


class StatusDetailView(APIView):

    permission_classes = (IsAuthenticatedOrReadOnly, )

    def get_status(self, pk):
        try:
            return Status.objects.get(pk=pk)
        except Status.DoesNotExist:
            raise NotFound(detail="The Status Cannot Be Found")

    def get(self, request, pk):
        status_message = self.get_status(pk=pk)
        serialized_status = PopulatedStatusSerializer(status_message)
        return Response(serialized_status.data, status=status.HTTP_200_OK)

    def delete(self, request, pk):
        status_to_delete = self.get_status(pk=pk)
        status_to_delete.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

    def put(self, request, pk):
        status_to_update = self.get_status(pk=pk)
        updated_status = StatusSerializer(status_to_update, data=request.data)
        if updated_status.is_valid():
            updated_status.save()
            return Response(updated_status.data, status=status.HTTP_200_OK)
        return Response(updated_status.errors, status=status.HTTP_422_UNPROCESSABLE_ENTITY)
