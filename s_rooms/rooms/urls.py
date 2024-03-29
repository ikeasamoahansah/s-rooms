from django.urls import path
from rest_framework.generics import ListAPIView

from .models import Room
from .serializers import RoomSerializer
from .views import CreateRoomView, RoomDetailView, CreateMessageView, api_root

urlpatterns = [
    path("", api_root),
    path(
        "home/",
        ListAPIView.as_view(
            queryset=Room.objects.all(), serializer_class=RoomSerializer
        ),
        name="room-view",
    ),
    path(
        "create/",
        CreateRoomView.as_view(),
        name="room-create",
    ),
    path("<uuid:pk>/", RoomDetailView.as_view(), name="room-detail"),
    path("<uuid:pk>/messages/", CreateMessageView.as_view(), name="messages-detail"),
]
