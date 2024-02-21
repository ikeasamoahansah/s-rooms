from django.contrib.auth.models import User

from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework.reverse import reverse
from rest_framework.permissions import AllowAny, IsAdminUser, IsAuthenticated
from rest_framework import generics
from rest_framework import status
from rest_framework.views import APIView

from .models import *
from .serializers import *

from django.contrib.auth.models import User


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
        host_id = request.user.id
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
