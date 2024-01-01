from django.urls import path

from .views import *

urlpatterns = [
    path("", api_root),
    path("home/", RoomView.as_view(), name="room-view"),
]
