from django.urls import path
from rest_framework.generics import ListAPIView

from .models import *
from .serializers import *
from .views import *

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
    )
]
