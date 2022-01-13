from django.contrib import admin
from django.urls import path
from django.urls.conf import include

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/posts/', include('posts.urls')),
    path('api/post_reply/', include('post_reply.urls')),
    path('api/chats/', include('chats.urls')),
    path('api/chats/message_detail/', include('message_detail.urls')),
    path('api/auth/', include('jwt_auth.urls')),
]
