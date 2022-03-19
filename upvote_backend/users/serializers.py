from numpy import source
from rest_framework import serializers
from django.contrib.auth.models import User
from votables.models import Votable
from votables.serializers import VotableSerializer


class UserSerializer(serializers.ModelSerializer):

    class Meta:
        model = User
        fields = ['id', 'username', 'first_name',
                  'last_name', 'date_joined', 'email', 'last_login']
