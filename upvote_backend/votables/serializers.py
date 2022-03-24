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
    upvoted = serializers.SerializerMethodField()

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

    def get_upvoted(self, obj):
        print(self.context["request"].user)
        try:
            upvote = Upvote.objects.get(
                user=self.context["request"].user, votable=obj)
            return True
        except:
            return False


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
        user = self.context.get("request").user
        try:

            user = User.objects.get(username=user)
            print(user)
            obj = Like.objects.get(
                comment=obj, user=user)
            return True
        except:
            return False


class LikeSerializer(serializers.ModelSerializer):
    user = serializers.ReadOnlyField(source='user.id')

    class Meta:
        model = Like
        fields = '__all__'


class UpvoteSerializer(serializers.ModelSerializer):
    # calculate current upvote score with likes, comments, upvotes etc.
    current_score = serializers.SerializerMethodField()
    user = serializers.ReadOnlyField(source='user.id')

    class Meta:
        model = Upvote
        fields = '__all__'

    def get_current_score(self, obj):
        return 10


class ShareSerializer(serializers.ModelSerializer):
    class Meta:
        model = Share
        fields = '__all__'


class StorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Story
        fields = '__all__'
