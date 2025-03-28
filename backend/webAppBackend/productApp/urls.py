from django.urls import path
from .views import *

urlpatterns = [
    path("", home, name="home"),
    path("products/", getProducts, name="getProducts"), 
    path("addProduct/", addProduct, name="addProduct"),
    path("products/<int:pk>", getProductbyId, name= "getProductbyId"),
]