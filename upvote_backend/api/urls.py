from django.urls import include, path
from votables import views
from django.contrib import admin
from rest_framework.authtoken.views import obtain_auth_token


urlpatterns = [
    path('votables/', include("votables.urls")),
    path('users/', include('users.urls')),
    path("auth/", obtain_auth_token),
    path('api-auth/', include('rest_framework.urls', namespace='rest_framework'))
]
