from rest_framework import serializers
from product.models import Product
from users.models import User

class ProductSerializer(serializers.ModelSerializer):
    """Serializers for the Product class"""
    class Meta:
        model = Product
        fields = ['product_id', 'user', 'name', 'image',
                  'description', 'price', 'old_price', 'product_status',
                  'date_added']