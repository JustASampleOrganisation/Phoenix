from django.contrib import admin
from .models import *


@admin.register(Restaurant)
class RestaurantAdmin(admin.ModelAdmin):
    list_display = ('name', 'address',)
    list_filter = ('name', 'address',)
    search_fields = ('name', )


@admin.register(Product)
class ProductAdmin(admin.ModelAdmin):
    list_display = ('name', 'price', 'description', 'rest_id')
    list_filter = ('name', 'price',)
    search_fields = ('name', )


@admin.register(Table)
class TableAdmin(admin.ModelAdmin):
    list_display = ('number', 'rest_id',)
    list_filter = ('number',)
    search_fields = ('number',)


@admin.register(Order)
class OrderAdmin(admin.ModelAdmin):
    list_display = ('status', 'start_date', 'end_date')
    list_filter = ('status',)
    search_fields = ('status',)

@admin.register(OrderBasket)
class OrderBasketAdmin(admin.ModelAdmin):
    list_display = ('order_id', 'product_id', 'number',)
    list_filter = ('number',)
    search_fields = ('number',)
    

@admin.register(Officiant)
class OfficiantAdmin(admin.ModelAdmin):
    list_display = ('name', 'rest_id',)
    list_filter = ('name',)
    search_fields = ('name',)