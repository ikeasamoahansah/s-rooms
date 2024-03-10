from rest_framework import serializers

from django.contrib.auth.models import User

from .models import *


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ["id", "username", "email"]


class MessageSerializer(serializers.ModelSerializer):
    created_at_formatted = serializers.SerializerMethodField()
    user = UserSerializer()

    class Meta:
        model = Message
        fields = ["id", "text", "created_at", "created_at_formatted", "user"]
        depth = 1

    def get_created_at_formatted(self, obj: Message):
        return obj.created_at.strftime("%d-%m-%Y %H:%M:%S")


class RoomSerializer(serializers.ModelSerializer):
    last_message = serializers.SerializerMethodField()
    messages = MessageSerializer(many=True, read_only=True)

    class Meta:
        model = Room
        fields = ["id", "name", "last_message", "messages"]
        depth = 1
        read_only_fields = ["messages", "last_message"]

    def get_last_message(self, obj: Room):
        return MessageSerializer(obj.messages.order_by("created_at").last()).data
