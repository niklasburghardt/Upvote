from django.db import models
from django.contrib.auth.models import User

# Create your models here.


class Profile(models.Model):
    user = models.ForeignKey(
        User, on_delete=models.CASCADE, related_name="profile")
    bio = models.CharField(max_length=255)
    #image = models.ImageField()


class Follow(models.Model):
    follower = models.ForeignKey(
        User, on_delete=models.CASCADE, related_name="followed")
    followed = models.ForeignKey(
        User, on_delete=models.CASCADE, related_name="followers")
    created = models.DateTimeField(auto_now_add=True)
