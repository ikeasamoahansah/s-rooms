from rest_framework import serializers

from django.contrib.auth.models import User

from .models import *


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ["id", "username", "email"]


class RoomSerializer(serializers.ModelSerializer):

    class Meta:
        model = Room
        fields = ["id", "name", "code"]
        depth = 1
