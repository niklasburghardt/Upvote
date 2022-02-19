from rest_framework import serializers
from django.contrib.auth.models import User
from .models import Votable, Comment, Upvote


class UserSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = User
        fields = '__all__'


class VotableSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Votable
        fields = '__all__'


class CommentSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Comment
        fields = '__all__'


class UpvoteSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Upvote
        fields = '__all__'
