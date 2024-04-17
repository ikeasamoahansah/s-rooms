from typing import Any
from django.shortcuts import redirect
from rest_framework_simplejwt.authentication import JWTAuthentication
from rest_framework_simplejwt.exceptions import InvalidToken, TokenError
import logging

logger = logging.getLogger(__name__)

class TokenExpirationMiddleware:
    def __init__(self, get_response):
        self.get_response = get_response

    def __call__(self, request) -> Any:
        user_auth = JWTAuthentication()
        try:
            user, _ = user_auth.authenticate(request)
            if user is not None and user.is_authenticated:
                request.user = user
            else:
                request.user = None
        except (InvalidToken, TokenError) as e:
            logger.warning(f"Token error {e}")
            if request.user.is_authenticated:
                redirect("logout")

        response = self.get_response(request)
        return response
