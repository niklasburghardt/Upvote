from django.urls import include, path
from rest_framework import routers
from votables import views

router = routers.DefaultRouter()
router.register(r'users', views.UserViewSet)
router.register(r'votables', views.VotableViewSet)
router.register(r'comment', views.CommentViewSet)
router.register(r'upvotes', views.UpvoteViewSet)

urlpatterns = [
    path('', include(router.urls)),
    path('api-auth/', include('rest_framework.urls', namespace='rest_framework'))
]
