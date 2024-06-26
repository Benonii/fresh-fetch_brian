from rest_framework import permissions
from users.models import User

class IsVendor(permissions.BasePermission):
    def has_permission(self, request, view):
        return request.user.is_vendor