from django.db import models
from django.contrib.auth.models import User


class Votable(models.Model):
    user = models.ForeignKey(
        User, on_delete=models.CASCADE, null=False, blank=False)
    content = models.CharField(max_length=255)
    created = models.DateTimeField(auto_now_add=True)
    updated = models.DateTimeField(auto_now=True)
    upvotes = models.ManyToManyField("Upvote", null=True, blank=True)

    def __str__(self):
        return self.content[0:50]


class Upvote(models.Model):
    user = models.ForeignKey(
        User, on_delete=models.CASCADE, null=False, blank=False)
    amount = models.IntegerField()
    created = models.DateTimeField(auto_now_add=True)
    isActive = models.BooleanField()
    terminated = models.DateTimeField(blank=True, null=True)


class Comment(models.Model):
    user = models.ForeignKey(
        User, on_delete=models.CASCADE, null=False, blank=False)
    content = models.CharField(max_length=255)
    created = models.DateTimeField(auto_now_add=True)
    updated = models.DateTimeField(auto_now=True)
