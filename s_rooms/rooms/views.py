from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework.reverse import reverse
from rest_framework.permissions import AllowAny, IsAdminUser, IsAuthenticated

from rest_framework import generics
from .models import *
from .serializers import *

from accounts.models import CustomUser

@api_view(["GET"])
def api_root(request, format=None):
    return Response(
        {
            "home": reverse("room-view", request=request, format=format),
            "create": reverse("room-create", request=request, format=format),
        }
    )


class CreateRoomView(generics.CreateAPIView):
    queryset = CustomUser.objects.all()
    permission_classes = (IsAuthenticated, )
    serializer_class = RoomSerializer
   
   
