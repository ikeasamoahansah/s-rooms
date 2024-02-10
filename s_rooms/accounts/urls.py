from django.urls import path
from rest_framework.authtoken.views import obtain_auth_token

from .views import *

urlpatterns = [
    path("", api_root),
    path("users/", UserList.as_view(), name="account-view"),
    path("users/<int:pk>/", UserDetail.as_view(), name="account-detail"),
    path("register/", RegisterUserView.as_view(), name="auth-register"),
    path("login/", obtain_auth_token, name="auth-login"),
    path("logout/", UserLogoutView.as_view(), name="logout")
]
