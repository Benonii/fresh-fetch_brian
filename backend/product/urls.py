from django.urls import path, include
from product.views import ProductList, ProductDetail
from rest_framework.routers import DefaultRouter
from product.views import ProductViewSet

urlpatterns = [
    path('products/', ProductList.as_view(), name='product-list'),
    path('products/<int:pk>/', ProductDetail.as_view(), name='product-detail'),
]

router = DefaultRouter()
router.register(r'products', ProductViewSet, basename='product')

urlpatterns += [
    path('', include(router.urls)),
]

"""
router = DefaultRouter()
router.register(r'products', ProductViewSet, basename='product')

urlpatterns = [
    path('api/v1/', include(router.urls)),
]
"""
