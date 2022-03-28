from django.urls import include, path
from votables import views
from django.contrib import admin
from rest_framework.authtoken.views import obtain_auth_token
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
    TokenVerifyView
)

urlpatterns = [
    path('votables/', include("votables.urls")),
    path('users/', include('users.urls')),
    path("auth/", obtain_auth_token),

    path("token/", TokenObtainPairView.as_view(), name="token_obtain_pair"),
    path("token/refresh/", TokenRefreshView.as_view(), name="token_refresh"),
    path("token/verify/", TokenVerifyView.as_view(), name="token_verify"),
    path('api-auth/', include('rest_framework.urls', namespace='rest_framework'))
]
