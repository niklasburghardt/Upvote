from rest_framework import serializers
from rest_framework.reverse import reverse
from django.contrib.auth.models import User
from .models import Like, Votable, Comment, Upvote


class VotableSerializer(serializers.ModelSerializer):
    user = serializers.ReadOnlyField(source='user.username')
    first_name = serializers.ReadOnlyField(source='user.first_name')
    last_name = serializers.ReadOnlyField(source='user.last_name')

    class Meta:
        model = Votable
        fields = '__all__'
