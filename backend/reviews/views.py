from django.shortcuts import render
from rest_framework import generics
from rest_framework.permissions import IsAuthenticated
from .permissions import IsUser
from .serializers import ReviewSerializer
from .models import Review


class ReviewListView(generics.ListAPIView):
    """
    list api view
    """

    queryset = Review.objects.all()
    serializer_class = ReviewSerializer


class ReviewCreateView(generics.CreateAPIView):
    """
    Create api view
    """

    queryset = Review.objects.all()
    serializer_class = ReviewSerializer
    permission_classes = [IsAuthenticated, IsUser]

    def get_queryset(self):
        """
        This view should return a list of all the reviews
        for the specified product.
        """
        product_id = self.kwargs['product_id']
        return Review.objects.filter(product_id=product_id)

    def perform_create(self, serializer):
        """
        Save the new review with the user and product_id.
        """
        product_id = self.kwargs['product_id']
        serializer.save(user=self.request.user, product_id=product_id)


class ReviewUpdateView(generics.UpdateAPIView):
    """
    Update api view
    """

    queryset = Review.objects.all()
    serializer_class = ReviewSerializer
    permission_classes = [IsAuthenticated, IsUser]
    lookup_field = 'id'

    def perform_update(self, serializer):
        """
        Save the updated review with the user and product_id.
        """
        serializer.save(user=self.request.user)


class ReviewDeleteView(generics.DestroyAPIView):
    """
    Destroy api view
    """

    queryset = Review.objects.all()
    serializer_class = ReviewSerializer
    permission_classes = [IsAuthenticated, IsUser]
    lookup_field = 'id'


class ReviewDetailView(generics.RetrieveAPIView):
    """
    Retrieve api view
    """

    queryset = Review.objects.all()
    serializer_class = ReviewSerializer
    lookup_field = 'id'
