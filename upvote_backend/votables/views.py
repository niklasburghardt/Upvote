
from django.http import Http404
from django.shortcuts import render
from rest_framework import viewsets, status, mixins, generics
from rest_framework import permissions, authentication
from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework.views import APIView
from django.contrib.auth.models import User
from api.mixins import FromUserQuerySetMixin, OwnerPermissionMixin

from api.permissions import IsOwnerOrReadOnly
from users.models import Follow

from .models import Like, Share, Story, Votable, Comment, Upvote
from users.serializers import UserSerializer
from .serializers import CommentSerializer, LikeSerializer, ShareSerializer, StorySerializer, UpvoteSerializer, VotableSerializer
from votables import serializers


class VotableList(generics.ListCreateAPIView):
    queryset = Votable.objects.all()
    serializer_class = VotableSerializer

    permission_classes = [permissions.IsAuthenticatedOrReadOnly]

    def perform_create(self, serializer):
        try:
            image = self.request.data["image"]
        except:
            image = None
        serializer.save(user=self.request.user, image=image)


class VotableListFollowed(generics.ListAPIView):
    queryset = Votable.objects.all()
    serializer_class = VotableSerializer

    def get_queryset(self):
        user = User.objects.filter(id=1)
        user_follows = Follow.objects.filter(follower__in=user)
        followed = User.objects.filter(followers__in=user_follows)
        qs = super().get_queryset()
        return qs.filter(user__in=followed)


class VotableDetail(OwnerPermissionMixin, generics.RetrieveUpdateDestroyAPIView):
    queryset = Votable.objects.all()
    serializer_class = VotableSerializer


class UpvoteForVotable(generics.ListCreateAPIView):
    queryset = Upvote.objects.all()
    serializer_class = UpvoteSerializer

    def perform_create(self, serializer):
        votable_id = self.request.data["votable"]
        votable = Votable.objects.get(id=votable_id)
        upvotes = votable.comments.count()
        serializer.save(user=self.request.user, upvote_score=upvotes)


class CommentForUpvote(generics.ListCreateAPIView):
    queryset = Comment.objects.all()
    serializer_class = CommentSerializer
    permission_classes = [permissions.AllowAny]

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

    def get_queryset(self):
        qs = super().get_queryset()
        pk = self.kwargs["pk"]
        return qs.filter(votable__id=pk)


class LikeComment(generics.ListCreateAPIView):
    queryset = Like.objects.all()
    serializer_class = LikeSerializer
    lookup_field = "pk"

    def perform_create(self, serializer):
        comment = self.request.data["comment"]
        user = self.request.user
        existing = Like.objects.filter(comment=comment, user__username=user)

        if existing.exists():
            existing.delete()
            return Response(status=status.HTTP_204_NO_CONTENT)
        serializer.save(user=user)

    def get_queryset(self):
        qs = super().get_queryset()
        return qs.filter(comment__id=self.kwargs["pk"])


class ShareVotable(generics.ListCreateAPIView):
    queryset = Share.objects.all()
    serializer_class = ShareSerializer

    def perform_create(self, serializer):
        votable = self.request.data["votable"]
        sent = self.request.user
        received = self.request.data["received"]
        if sent == received:
            return Response(status=status.HTTP_400_BAD_REQUEST)
        existing = Share.objects.filter(
            votable=votable, sent=sent, received=received)
        if existing.exists():
            existing.delete()
        serializer.save(sent=self.request.user)

    def get_queryset(self):
        qs = super().get_queryset()
        return qs.filter(comment__id=self.kwargs["pk"])


class StoryViewset(generics.ListCreateAPIView):
    queryset = Story.objects.all()
    serializer_class = StorySerializer

    def perform_create(self, serializer):
        votable = self.request.data["votable"]
        user = self.request.user
        existing = Story.objects.filter(votable=votable, user=user)
        if existing.exists():
            existing.delete()
        serializer.save(user=user)

    def get_queryset(self):
        qs = super().get_queryset()
        return qs.filter(comment__id=self.kwargs["pk"])


class LikeViewset(generics.ListAPIView):
    queryset = Like.objects.all()
    serializer_class = LikeSerializer
