from django.contrib.auth.models import User
from django.http import Http404

from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework.reverse import reverse
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework import status
from rest_framework.views import APIView

# from accounts.permissions import CanCreateRoom

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
            return Room.objects.get(code=pk)
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
        # user = request.user
        # room.users.add(user)
        serializer = RoomSerializer(room)
        return Response(serializer.data)

    def post(self, request, pk, format=None):
        room = Room.objects.get(code=pk)
        user = request.user
        room.current_users.add(user)
        serializer = RoomSerializer(room)
        return Response(serializer.data)

    permision_classes = [
        IsAuthenticated,
    ]


class SessionJoinRoomView(APIView):
    """Session-based room joining for anonymous users"""
    permission_classes = [AllowAny]
    
    def post(self, request, pk, format=None):
        try:
            room = Room.objects.get(code=pk)
        except Room.DoesNotExist:
            return Response(
                {"error": "Room not found"}, 
                status=status.HTTP_404_NOT_FOUND
            )
        
        # Check if user is already in a room
        current_room_code = request.session.get('current_room')
        if current_room_code:
            if current_room_code == str(pk):
                # Already in this room
                serializer = RoomSerializer(room)
                return Response({
                    "message": "Already joined this room",
                    "room": serializer.data
                })
            else:
                # Already in a different room - not allowed
                return Response(
                    {"error": "You are already in another room. Please leave current room first."},
                    status=status.HTTP_400_BAD_REQUEST
                )
        
        # Join the room by storing room code in session
        request.session['current_room'] = str(pk)
        request.session.save()
        
        serializer = RoomSerializer(room)
        return Response({
            "message": "Successfully joined room",
            "room": serializer.data
        }, status=status.HTTP_201_CREATED)


class SessionLeaveRoomView(APIView):
    """Session-based room leaving for anonymous users"""  
    permission_classes = [AllowAny]
    
    def post(self, request, format=None):
        current_room_code = request.session.get('current_room')
        
        if not current_room_code:
            return Response(
                {"error": "You are not currently in any room"},
                status=status.HTTP_400_BAD_REQUEST
            )
        
        # Remove room from session
        del request.session['current_room']
        request.session.save()
        
        return Response({
            "message": "Successfully left room"
        }, status=status.HTTP_200_OK)


class SessionCurrentRoomView(APIView):
    """Get the current room from session"""
    permission_classes = [AllowAny]
    
    def get(self, request, format=None):
        current_room_code = request.session.get('current_room')
        
        if not current_room_code:
            return Response(
                {"message": "Not currently in any room", "room": None}
            )
        
        try:
            room = Room.objects.get(code=current_room_code)
            serializer = RoomSerializer(room)
            return Response({
                "message": "Currently in room",
                "room": serializer.data
            })
        except Room.DoesNotExist:
            # Room was deleted, clean up session
            del request.session['current_room']
            request.session.save()
            return Response(
                {"message": "Current room no longer exists", "room": None}
            )
