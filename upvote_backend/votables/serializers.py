from numpy import source
from rest_framework import serializers
from rest_framework.reverse import reverse
from django.contrib.auth.models import User
from .models import Like, Share, Story, Votable, Comment, Upvote
from django.db.models import Sum, Avg


class VotableSerializer(serializers.ModelSerializer):
    user = serializers.ReadOnlyField(source='user.username')
    first_name = serializers.ReadOnlyField(source='user.first_name')
    last_name = serializers.ReadOnlyField(source='user.last_name')
    comments = serializers.SerializerMethodField()
    upvotes = serializers.SerializerMethodField()
    shares = serializers.SerializerMethodField()
    stories = serializers.SerializerMethodField()

    class Meta:
        model = Votable
        fields = '__all__'

    def get_comments(self, obj):
        comments = Comment.objects.filter(votable=obj)
        return comments.count()

    def get_upvotes(self, obj):
        upvotes = Upvote.objects.filter(votable=obj)
        return upvotes.aggregate(Sum("paid"))

    def get_shares(self, obj):
        shares = Share.objects.filter(votable=obj)
        return shares.count()

    def get_stories(self, obj):
        stories = Story.objects.filter(votable=obj)
        return stories.count()


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


class UpvoteSerializer(serializers.ModelSerializer):
    # calculate current upvote score with likes, comments, upvotes etc.
    current_score = serializers.SerializerMethodField()

    class Meta:
        model = Upvote
        fields = '__all__'

    def get_current_score(self, obj):
        votable = Votable.objects.get(id=obj.votable.id)
        upvotes = Upvote.objects.filter(votable=obj.votable)
        upvote_score = votable.upvotes.aggregate(Sum("paid"))
        return upvotes.aggregate(Sum("paid"))


class ShareSerializer(serializers.ModelSerializer):
    class Meta:
        model = Share
        fields = '__all__'


class StorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Story
        fields = '__all__'
