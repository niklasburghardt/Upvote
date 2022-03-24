from numpy import source
from rest_framework import serializers
from django.contrib.auth.models import User
from users.models import Follow, Profile

from votables.models import Votable
from votables.serializers import VotableSerializer
from django.db.models import Sum, Avg


class UserSerializer(serializers.ModelSerializer):
    bio = serializers.SerializerMethodField()
    followed = serializers.SerializerMethodField()
    followers = serializers.SerializerMethodField()
    paid_active = serializers.SerializerMethodField()
    paid_sold = serializers.SerializerMethodField()
    sold = serializers.SerializerMethodField()
    is_followed = serializers.SerializerMethodField()
    upvotes = serializers.SerializerMethodField()

    class Meta:
        model = User
        fields = ['id', 'username', 'first_name',
                  'last_name', 'date_joined', 'email', 'last_login', "bio", "followed", "followers", "paid_active", "paid_sold", "sold", "is_followed", "upvotes"]

    def get_bio(self, obj):
        try:
            profile = Profile.objects.get(user=obj)

            return profile.bio
        except:
            return ""

    def get_followed(self, obj):
        return obj.followed.count()

    def get_followers(self, obj):
        return obj.followers.count()

    def get_paid_active(self, obj):
        upvotes = obj.upvotes.filter(active=True)
        return upvotes.aggregate(Sum("paid"))["paid__sum"]

    def get_paid_sold(self, obj):
        upvotes = obj.upvotes.filter(active=False)
        return upvotes.aggregate(Sum("paid"))["paid__sum"]

    def get_sold(self, obj):
        upvotes = obj.upvotes.filter(active=False)
        return upvotes.aggregate(Sum("sold"))["sold__sum"]

    def get_upvotes(self, obj):
        pa = obj.upvotes.filter(active=True)
        pas = pa.aggregate(Sum("paid"))["paid__sum"]

        ps = obj.upvotes.filter(active=False)
        pss = ps.aggregate(Sum("paid"))["paid__sum"]

        s = obj.upvotes.filter(active=False)
        ss = s.aggregate(Sum("sold"))["sold__sum"]

        b = obj.bought_upvotes.all()

        bs = b.aggregate(Sum("amount"))["amount__sum"]

        if type(pas) != int:
            pas = 0
        if type(pss) != int:
            pss = 0
        if type(ss) != int:
            ss = 0
        if type(bs) != int:
            bs = 0

        return ss-pas-pss+bs

    def get_is_followed(self, obj):
        user = self.context.get("request").user

        try:
            user = User.objects.get(username=user)

            follow = Follow.objects.get(follower=user, followed=obj)

            return True
        except:
            return False


class FollowSerializer(serializers.ModelSerializer):
    user = serializers.ReadOnlyField(source='follower.id')

    class Meta:
        model = Follow
        fields = "__all__"
