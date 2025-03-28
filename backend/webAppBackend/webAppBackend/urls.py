from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path('admin/', admin.site.urls),
    path("api/", include("productApp.urls")),
    path("users/", include("userManagement.urls")),
]