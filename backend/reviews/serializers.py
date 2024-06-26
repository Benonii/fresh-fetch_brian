"""
Review model serializer module
"""
from rest_framework import serializers
from .models import Review
from product.models import Product


class ReviewSerializer(serializers.Serializer):
    """
    Serializer for the review model
    """

    content = serializers.CharField(max_length=500, required=True)
    # product_id = serializers.CharField(max_length=100)

    # def save(self, request):
    #     """"
    #     save method
    #     """
    
    #     review = super().save()
    #     review.user_id = request.user
    #     review.save()

    def create(self, validated_data):
        """
        Create and return a new `Review` instance, given the validated data.
        """
        request = self.context.get('request')
        if request is None:
            raise serializers.ValidationError("Request context is not provided")
        
        user = request.user
        content = validated_data.get('content')
        product_id = validated_data.get('product_id')
        product = Product.objects.get(id=product_id)

        return Review.objects.create(user=user, content=content, product=product)

    def update(self, instance, validated_data):
        """
        Update and return an existing `Review` instance, given the validated data.
        """
        instance.content = validated_data.get('content', instance.content)
        instance.save()
        return instance
    