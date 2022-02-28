from django.urls import include, path
from votables import views
from django.contrib import admin

urlpatterns = [
    path("api/", include("api.urls")),
    path("admin/", admin.site.urls),
    path("api/v2/", include('upvote_backend.routers'))

]
