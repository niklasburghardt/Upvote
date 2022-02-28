

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
from .serializers import VotableSerializer
from votables import serializers


class VotableList(generics.ListCreateAPIView):
    queryset = Votable.objects.all()
    serializer_class = VotableSerializer

    authentication_classes = [
        authentication.SessionAuthentication, authentication.TokenAuthentication]
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)


class MyVotablesList(FromUserQuerySetMixin, VotableList):
    pass


class VotableDetail(OwnerPermissionMixin, generics.RetrieveUpdateDestroyAPIView):
    queryset = Votable.objects.all()
    serializer_class = VotableSerializer
    authentication_classes = [
        authentication.SessionAuthentication, authentication.TokenAuthentication]
