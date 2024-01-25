import uuid

from django.db import models
from django.conf import settings


class Room(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    host = models.ForeignKey("accounts.CustomUser", on_delete=models.CASCADE, related_name="rooms")
    name = models.CharField(max_length=256)
    current_users = models.ManyToManyField("accounts.CustomUser", related_name="current_rooms", blank=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.name} | {self.host}"


class Message(models.Model):
    room = models.ForeignKey("rooms.Room", on_delete=models.CASCADE, related_name="messages")
    text = models.TextField(max_length=500)
    user = models.ForeignKey("accounts.CustomUser", on_delete=models.CASCADE, related_name="messages")
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Message({self.user} | {self.room})"
