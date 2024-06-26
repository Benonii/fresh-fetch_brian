from django.contrib import admin
from order.models import Order, OrderItems
# Register your models here.

@admin.register(Order)
class OrderAdmin(admin.ModelAdmin):
    list_display = ('user', 'order_id', 'order_date',
                    'paid_status',)
    search_fields = ('user', 'order_id', 'order_date')

@admin.register(OrderItems)
class OrderItemsAdmin(admin.ModelAdmin):
    list_display = ('order', 'product', 'quantity', 'price')
    search_fields = ('order', 'product')

