from django.http.response import HttpResponse
from django.shortcuts import render
from .models import PostReply
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status  # status code
from .serializers.common import PostReplySerializer


class PostReplyDetailView(APIView):
    def delete(self, _request, pk):
        try:
            post_reply = PostReply.objects.get(id=pk)
            post_reply.delete()
        except:
            return Response(status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        return Response(status=status.HTTP_204_NO_CONTENT)

    def put(self, request, pk):
        post_reply = PostReply.objects.get(id=pk)  # django ORM method to grab
        updated_post_reply = PostReplySerializer(post_reply, data=request.data)
        if updated_post_reply.is_valid():
            updated_post_reply.save()
            return Response(updated_post_reply.data, status=status.HTTP_202_ACCEPTED)
        else:
            return Response(updated_post_reply.errors, status=status.HTTP_422_UNPROCESSABLE_ENTITY)

    def get(self, _request, pk):
        post_reply = PostReply.objects.get(id=pk)
        serialized_post_reply = PostReplySerializer(post_reply)
        return Response(serialized_post_reply.data, status=status.HTTP_200_OK)


class PostReplyListView(APIView):
    def post(self, request):
        request.data["author"] = request.user.id
        post_reply = PostReplySerializer(data=request.data)
        if post_reply.is_valid():
            post_reply.save()  # <--- django ORM method to save to db
            return Response(post_reply.data, status=status.HTTP_201_CREATED)
        else:
            return Response(post_reply.errors, status=status.HTTP_422_UNPROCESSABLE_ENTITY)

    def get(self, _request):
        posts_reply = PostReply.objects.all()
        serialized_posts_reply = PostReplySerializer(posts_reply, many=True)
        return Response(serialized_posts_reply.data, status=status.HTTP_200_OK)
