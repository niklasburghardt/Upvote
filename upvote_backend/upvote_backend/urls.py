from django.urls import include, path
from votables import views
from django.contrib import admin

urlpatterns = [
    path("api/", include("votables.urls")),
    path("admin/", admin.site.urls)

]
