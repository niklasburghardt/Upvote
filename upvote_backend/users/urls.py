from django.urls import include, path
from . import views

# /api/votables
urlpatterns = [
    path('', views.UserList.as_view()),
    path('self/', views.UserInfo.as_view()),
    path('<str:username>/details', views.UserDetail.as_view()),
    path('<str:username>/votables', views.UserPosts.as_view()),

]
