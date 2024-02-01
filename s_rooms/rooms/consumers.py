# import json

# from channels.db import database_sync_to_async
# from djangochannelsrestframework.generics import GenericAsyncAPIConsumer
# from djangochannelsrestframework.observer import model_observer
# from djangochannelsrestframework.observer.generics import ObserverModelInstanceMixin, action

# from .models import Message, Room
# from accounts.models import CustomUser
# from .serializers import MessageSerializer, RoomSerializer, UserSerializer


# class RoomConsumer(ObserverModelInstanceMixin, GenericAsyncAPIConsumer):
#     queryset = Room.objects.all()
#     serializer_class = RoomSerializer
#     lookup_field = "pk"

#     async def disconnect(self, code):
#         if hasattr(self, "room_subscribe"):
#             await self.remove_user_from_room(self.room_subscribe)
#             await self.notify_users()
#         await super().disconnect(code)

#     @action()
#     async def join_room(self, pk, **kwargs):
#         self.room_subscribe = pk
#         await self.add_user_to_room(pk)
#         await self.notify_users()

#     @action()
#     async def leave_room(self, pk, **kwargs):
#         await self.remove_user_from_room(pk)
    
