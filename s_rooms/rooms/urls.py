from django.urls import path
from rest_framework.generics import ListAPIView

from .models import Room
from .serializers import RoomSerializer
from .views import (
    CreateRoomView, 
    RoomDetailView, 
    JoinRoomView, 
    SessionJoinRoomView,
    SessionLeaveRoomView,
    SessionCurrentRoomView,
    api_root
)

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
    path("<int:pk>/", RoomDetailView.as_view(), name="room-detail"),
    path("join/<int:pk>/", JoinRoomView.as_view(), name="room-join"),
    # Session-based room management
    path("session-join/<int:pk>/", SessionJoinRoomView.as_view(), name="session-room-join"),
    path("session-leave/", SessionLeaveRoomView.as_view(), name="session-room-leave"),
    path("session-current/", SessionCurrentRoomView.as_view(), name="session-current-room"),
]
