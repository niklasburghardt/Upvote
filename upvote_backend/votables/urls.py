from django.urls import include, path
from rest_framework.authtoken.views import obtain_auth_token
from . import views

# /api/votables
urlpatterns = [
    path("auth/", obtain_auth_token),
    path('', views.VotableList.as_view()),
    path('<int:pk>', views.VotableDetail.as_view()),
    path('api-auth/', include('rest_framework.urls', namespace='rest_framework'))
]
