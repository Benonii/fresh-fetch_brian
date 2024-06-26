from rest_framework import serializers
from order.models import Order, OrderItems
from product.serializers import ProductSerializer, Product

class OrderItemSerializer(serializers.ModelSerializer):
    """serializers for the orderItems class"""
    #product = ProductSerializer()
    product_id = serializers.PrimaryKeyRelatedField(queryset=Product.objects.all(), source='product.id')
   
    class Meta:
        model = OrderItems
        fields = ['product_id', 'quantity', 'price']


class OrderSerializer(serializers.ModelSerializer):
    """serializers for the order"""
    items = OrderItemSerializer(many=True)

    class Meta:
        model = Order
        fields = ['user', 'order_id', 'items', 'price', 'order_date',
                  'paid_status', 'order_status', 'address', 'city',
                  'state', 'country', 'total']


