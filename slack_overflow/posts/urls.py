from django.urls import path
from . import views
from .views import PostDetailView, PostListView
# from post_reply. import PostReply

urlpatterns = [
    path('', PostListView.as_view()),
    path('<int:pk>/', PostDetailView.as_view()),
]
