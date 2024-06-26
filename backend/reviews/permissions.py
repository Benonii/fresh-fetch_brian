"""
Global permissions module
"""
from rest_framework.permissions import BasePermission


class IsUser(BasePermission):
    """"
    Permission to check that the incoming request is from a 
    from a normal User account type
    """

    def has_permission(self, request, view):
        """
        verify the user has access. Returns True if the user is not a vendor.
        """

        role = request.user.is_vendor

        if role:
            # the user is a vendor, return false
            return False
        return True