from dataclasses import fields
from numpy import source
from rest_framework import serializers
from rest_framework.reverse import reverse
from django.contrib.auth.models import User
from .models import Like, Votable, Comment, Upvote


class UserSerializer(serializers.ModelSerializer):
    votables = serializers.PrimaryKeyRelatedField(
        many=True, queryset=Votable.objects.all())

    class Meta:
        model = User
        fields = '__all__'


class VotableSerializer(serializers.ModelSerializer):
    user = serializers.ReadOnlyField(source='user.username')

    class Meta:
        model = Votable
        fields = '__all__'
