from django.contrib.auth import logout
from django.contrib.auth.models import User
from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework.reverse import reverse
from rest_framework.views import APIView
from rest_framework import generics
from rest_framework.permissions import AllowAny, IsAdminUser
from .serializers import *
from .permissions import IsOwnerOrReadOnly

@api_view(["GET"])
def api_root(request, format=None):
    return Response(
        {
            "accounts": reverse("account-view", request=request, format=format),
            "user_register": reverse("auth-register", request=request, format=format),
            "user_login": reverse("auth-login", request=request, format=format),
        }
    )


class UserList(generics.ListCreateAPIView):
    """
    List all or create accounts 
    """
    queryset = User.objects.all()
    permission_classes = (IsAdminUser,)
    serializer_class = UserSerializer


class UserDetail(generics.RetrieveUpdateDestroyAPIView):
    """
    Retrieve, update or delete a user instance.
    """

    queryset = User.objects.all()
    permission_classes = (IsAdminUser, IsOwnerOrReadOnly)
    serializer_class = UserSerializer


class RegisterUserView(generics.CreateAPIView):
    queryset = User.objects.all()
    permission_classes = (AllowAny,)
    serializer_class = RegisterUserSerializer


class UserLogoutView(APIView):
    def post(self, request):
        logout(request)
        return Response(status=status.HTTP_200_OK)

