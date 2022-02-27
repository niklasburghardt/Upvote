from django.urls import include, path
from rest_framework.authtoken.views import obtain_auth_token
from . import views


urlpatterns = [
    path("auth/", obtain_auth_token),
    path('votables/', views.VotableList.as_view()),
    path('votables/<int:pk>', views.VotableDetail.as_view()),
    path('users/', views.UserList.as_view()),
    path('users/<int:pk>', views.UserDetail.as_view()),
    path('userposts/<str:username>', views.UserPosts.as_view()),
    path('api-auth/', include('rest_framework.urls', namespace='rest_framework'))
]
