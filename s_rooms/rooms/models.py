import uuid
import random

from django.db import models
from django.contrib.auth.models import User


def generate_random_code() -> int:
    """
    Generate a random code for a room
    For users to join
    """
    return random.randint(43211, 99999)


class Room(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    code = models.IntegerField(default=generate_random_code, unique=True)
    host = models.ForeignKey(User, on_delete=models.CASCADE, related_name="rooms")
    name = models.CharField(max_length=256)
    current_users = models.ManyToManyField(
        User, related_name="current_rooms", blank=True
    )
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.name} | {self.host}"
