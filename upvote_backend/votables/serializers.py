from numpy import source
from rest_framework import serializers
from rest_framework.reverse import reverse
from django.contrib.auth.models import User
from .models import Like, Votable, Comment, Upvote


class VotableSerializer(serializers.ModelSerializer):
    user = serializers.ReadOnlyField(source='user.username')
    first_name = serializers.ReadOnlyField(source='user.first_name')
    last_name = serializers.ReadOnlyField(source='user.last_name')
    comments = serializers.SerializerMethodField()

    class Meta:
        model = Votable
        fields = '__all__'

    def get_comments(self, obj):
        comments = Comment.objects.filter(votable=obj)
        return comments.count()


class CommentSerializer(serializers.ModelSerializer):
    user = serializers.ReadOnlyField(source='user.username')
    first_name = serializers.ReadOnlyField(source='user.first_name')
    last_name = serializers.ReadOnlyField(source='user.last_name')
    likes = serializers.SerializerMethodField()
    liked = serializers.SerializerMethodField()

    class Meta:
        model = Comment
        fields = '__all__'

    def get_likes(self, obj):
        likes = Like.objects.filter(comment=obj)
        return likes.count()

    def get_liked(self, obj):
        if Like.objects.filter(comment=obj, user=obj.user).exists():
            return True
        return False


class LikeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Like
        fields = '__all__'
