from django.urls import include, path
from votables import views
from django.contrib import admin
from django.conf import settings
from django.conf.urls.static import static

urlpatterns = [
    path("api/", include("api.urls")),
    path("admin/", admin.site.urls),
    path("api/v2/", include('upvote_backend.routers'))

]
urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
