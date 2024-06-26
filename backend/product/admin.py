from django.contrib import admin
from product.models import Product

# Register your models here.
@admin.register(Product)
class ProductAdmin(admin.ModelAdmin):
    list_display = ('name', 'user', 'price', 'product_status', 'date_added')
    search_fields = ('name', 'user__email')