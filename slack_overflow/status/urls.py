from django.urls import path
from .views import StatusDetailView, StatusListView

urlpatterns = [
    path('', StatusListView.as_view()),
    path('<int:pk>/', StatusDetailView.as_view())
]
