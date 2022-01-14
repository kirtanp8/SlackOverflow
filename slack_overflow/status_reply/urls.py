
from django.urls import path
from .views import StatusReplyListView, StatusReplyDetailView

urlpatterns = [
    path('', StatusReplyListView.as_view()),
    path('<int:pk>/', StatusReplyDetailView.as_view())
]
