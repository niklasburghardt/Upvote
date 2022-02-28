from rest_framework import viewsets, status, mixins, generics
from rest_framework import permissions, authentication
from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework.views import APIView
from django.contrib.auth.models import User


from votables.models import Like, Votable, Comment, Upvote
from .serializers import UserSerializer
from votables.serializers import VotableSerializer

from users import serializers


class UserList(generics.ListAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer


class UserDetail(generics.RetrieveAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    lookup_field = 'username'


class UserPosts(generics.ListAPIView):
    permission_classes = [permissions.IsAuthenticated]
    queryset = Votable.objects.all()
    serializer_class = VotableSerializer
    lookup_field = 'username'

    def get_queryset(self):
        qs = super().get_queryset()
        username = self.kwargs['username']
        return qs.filter(user__username=username)
