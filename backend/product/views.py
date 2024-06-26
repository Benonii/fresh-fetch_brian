from django.shortcuts import render
from rest_framework import generics, viewsets
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView
from product.models import Product
from product.serializers import ProductSerializer
from users.models import User
from product.permissions import IsVendor
"""
class isVendor(IsAuthenticated):
    
    Custom permission to allow only vendors to create, update, and delete products.
    
    def has_permission(self, request, view):
        function that handle the permission
        return super().has_permission(request, view) and request.user.is_vendor
"""

# Create your views here.
class ProductList(generics.ListCreateAPIView):
    """listing the views"""
    queryset = Product.objects.all()
    serializer_class = ProductSerializer

class ProductDetail(generics.RetrieveUpdateDestroyAPIView):
    """listing the detailviews"""
    queryset = Product.objects.all()
    serializer_class = ProductSerializer

class ProductViewSet(viewsets.ModelViewSet):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer
    permission_classes = [IsVendor]

    def perform_create(self, serializer):
        """vendor can perform the creation"""
        serializer.save(user=self.request.user)

    def perform_update(self, serializer):
        """vendor can perform the update"""
        serializer.save(user=self.request.user)
