

from django.utils import timezone
from rest_framework import viewsets, status, mixins, generics
from rest_framework import permissions, authentication
from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework.views import APIView
from django.contrib.auth.models import User
from users.models import Follow


from votables.models import Like, Story, Votable, Comment, Upvote
from .serializers import FollowSerializer, UserSerializer
from votables.serializers import StorySerializer, VotableSerializer

from users import serializers


class UserList(generics.ListCreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer


class UserDetail(generics.RetrieveAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    lookup_field = 'username'


class UserInfo(generics.ListAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    lookup_field = 'pk'

    def get_queryset(self):
        qs = super().get_queryset()
        return qs.filter(username=self.request.user)


class UserPosts(generics.ListAPIView):

    queryset = Votable.objects.all()
    serializer_class = VotableSerializer
    lookup_field = 'username'

    def get_queryset(self):
        qs = super().get_queryset()
        username = self.kwargs['username']
        return qs.filter(user__username=username)


class FollowUnfollow(generics.CreateAPIView):
    queryset = Follow.objects.all()
    serializer_class = FollowSerializer

    def perform_create(self, serializer):
        try:
            followed = Follow.objects.get(
                follower=self.request.user, followed=self.request.data["followed"])
            followed.delete()
        except:
            follower = User.objects.get(username=self.request.user)
            followed = User.objects.get(id=self.request.data["followed"])
            if follower == followed:
                return Response(status=status.HTTP_404_NOT_FOUND)
            serializer.save(follower=self.request.user)


class StoryViewset(generics.ListAPIView):
    queryset = Story.objects.all()
    serializer_class = StorySerializer

    def get_queryset(self):
        qs = super().get_queryset()
        yesterday = timezone.now() - timezone.timedelta(1)
        return qs.filter(created__gte=yesterday)
