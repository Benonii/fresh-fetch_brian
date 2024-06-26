""" User registration serializer module
"""
from dj_rest_auth.registration.serializers import RegisterSerializer as BaseSerializer
from dj_rest_auth.serializers import LoginSerializer as BaseLoginSerializer
from rest_framework import serializers
from .models import User
from .mixins import WritableOnCreateReadOnlyOnUpdateMixin


class RegisterSerializer(BaseSerializer):
    """
    A custom serialzer that extends dj-rest-auth serializer to include
    custom fields from our custom user model
    """

    username = None
    first_name = serializers.CharField(max_length=100, required=True)
    last_name = serializers.CharField(max_length=100, required=True)
    phone_number = serializers.CharField(max_length=16, required=True)
    is_vendor = serializers.BooleanField(default=False)

    def get_cleaned_data(self):
        """
        Clean up the added field
        """

        data = super().get_cleaned_data()
        data.update({
            'first_name': self.validated_data.get('first_name', ''),
            'last_name': self.validated_data.get('last_name', ''),
            'phone_number': self.validated_data.get('phone_number', ''),
            'is_vendor': self.validated_data.get('is_vendor', False),
        })
        return data
    
    def save(self, request):
        """
        save the instance to the database
        """
        
        user = super().save(request)
        user.first_name = self.validated_data.get('first_name', '')
        user.last_name = self.validated_data.get('last_name', '')
        user.phone_number = self.validated_data.get('phone_number', '')
        user.is_vendor = self.validated_data.get('is_vendor', False)
        user.save()
        return user


class LoginSerializer(BaseLoginSerializer):
    """
    Extends dj_rest_auth to remove the username field
    """

    username = None


class UserDetailsSerializer(WritableOnCreateReadOnlyOnUpdateMixin, serializers.ModelSerializer):
    """
    Specifies the User details return
    """

    class Meta:
        model = User
        fields = ['id', 'first_name', 'last_name', 'email', 'phone_number', 'is_vendor', 'image']
        writable_on_create_read_only_on_update = ['is_vendor']
        flexible_edit = ['first_name', 'last_name', 'email', 'phone_number', 'image']
