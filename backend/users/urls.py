from django.urls import path, include
from .views import VendorListView

urlpatterns = [
    path('users/', include('dj_rest_auth.urls')),
    path('users/register/', include('dj_rest_auth.registration.urls')),
    path('vendors/', VendorListView.as_view(), name='vendors-list'),
]