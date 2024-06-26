from rest_framework import generics
from .serializers import UserDetailsSerializer
from .models import User


class VendorListView(generics.ListAPIView):
    """
    list api view returns the list of vendors
    """

    queryset = User.objects.filter(is_vendor=True)
    serializer_class = UserDetailsSerializer
