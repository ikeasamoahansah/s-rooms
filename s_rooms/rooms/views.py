from django.contrib.auth.models import User
from django.http import Http404

from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework.reverse import reverse
from rest_framework.permissions import IsAuthenticated
from rest_framework import status
from rest_framework.views import APIView

from accounts.permissions import CanCreateRoom

from .models import Room
from .serializers import RoomSerializer


@api_view(["GET"])
def api_root(request, format=None):
    return Response(
        {
            "home": reverse("room-view", request=request, format=format),
            "create": reverse("room-create", request=request, format=format),
        }
    )


class CreateRoomView(APIView):
    def post(self, request, format=None):
        host_id = request.data.get("user")
        try:
            user = User.objects.get(id=host_id)
        except User.DoesNotExist:
            return Response(
                {"error": "User not found"}, status=status.HTTP_404_NOT_FOUND
            )

        serializer = RoomSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save(host=user)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    permission_classes = (IsAuthenticated,)


class RoomDetailView(APIView):
    """
    Retrieve, Delete, Update a room instance
    """

    def get_object(self, pk):
        try:
            return Room.objects.get(id=pk)
        except Room.DoesNotExist:
            raise Http404

    def get(self, request, pk, format=None):
        room = self.get_object(pk)
        serializer = RoomSerializer(room)
        return Response(serializer.data)

    def put(self, request, pk, format=None):
        room = self.get_object(pk)
        serializer = RoomSerializer(room, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, pk, format=None):
        room = self.get_object(pk)
        room.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

    permission_classes = [IsAuthenticated]


class JoinRoomView(APIView):
    """get a room, add user to the room"""
    def get(self, request, pk, format=None):
        room = Room.objects.get(code=pk)
        user = request.user
        room.users.add(user)
        return Response(status=status.HTTP_200_OK)

    permision_classes = [IsAuthenticated,]