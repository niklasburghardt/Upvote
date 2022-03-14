
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
from .models import Like, Votable, Comment, Upvote
from users.serializers import UserSerializer
from .serializers import CommentSerializer, LikeSerializer, VotableSerializer
from votables import serializers


class VotableList(generics.ListCreateAPIView):
    queryset = Votable.objects.all()
    serializer_class = VotableSerializer

    permission_classes = [permissions.IsAuthenticatedOrReadOnly]

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)


class MyVotablesList(FromUserQuerySetMixin, VotableList):
    pass


class VotableDetail(OwnerPermissionMixin, generics.RetrieveUpdateDestroyAPIView):
    queryset = Votable.objects.all()
    serializer_class = VotableSerializer


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

    def perform_create(self, serializer):
        comment = self.request.data["comment"]
        user = self.request.user
        existing = Like.objects.filter(comment=comment, user=user)

        if existing.exists():
            existing.delete()
            return Response(status=status.HTTP_204_NO_CONTENT)
        serializer.save(user=self.request.user)


class LikeViewset(generics.ListAPIView):
    queryset = Like.objects.all()
    serializer_class = LikeSerializer
