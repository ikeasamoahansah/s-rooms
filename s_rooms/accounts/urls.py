from django.urls import path

from .views import *

urlpatterns = [
    path("", api_root),
    path("accounts/", AccountView.as_view(), name="account-view"),
]
