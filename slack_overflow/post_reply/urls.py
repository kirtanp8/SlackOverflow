from django.urls import path
from . import views
from .views import PostReplyListView
from .views import PostReplyDetailView

urlpatterns = [
    path('<int:pk>/', PostReplyDetailView.as_view()),
    path('', PostReplyListView.as_view()),
]
