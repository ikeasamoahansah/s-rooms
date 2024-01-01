from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework.reverse import reverse
from rest_framework.views import APIView

from .models import *
from .serializers import *


@api_view(["GET"])
def api_root(request, format=None):
    return Response(
        {
            "accounts": reverse("account-view", request=request, format=format),
        }
    )


class AccountView(APIView):
    """
    List all accounts
    """

    def get(self, request, format=None):
        pass
