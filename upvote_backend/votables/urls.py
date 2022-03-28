from django.conf import settings
from django.urls import include, path
from rest_framework.authtoken.views import obtain_auth_token
from . import views
from django.conf.urls.static import static

# /api/votables
urlpatterns = [
    path('', views.VotableList.as_view()),
    path('followed/', views.VotableListFollowed.as_view()),
    path('<int:pk>', views.VotableDetail.as_view()),
    path('<int:pk>/upvote/', views.UpvoteForVotable.as_view()),
    path('<int:pk>/comments/', views.CommentForUpvote.as_view()),
    path('comments/<int:pk>/response', views.RespondToComment.as_view()),
    path('<int:pk>/share/', views.ShareVotable.as_view()),
    path('<int:pk>/story/', views.StoryViewset.as_view()),
    path('comments/<int:pk>/likes', views.LikeComment.as_view()),
    path('comments/<int:pk>/likes/<int:id>', views.LikeViewset.as_view()),
    path('likes/', views.LikeViewset.as_view()),
    path('api-auth/', include('rest_framework.urls', namespace='rest_framework'))
]
