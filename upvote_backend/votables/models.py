from django.db import models
from django.contrib.auth.models import User

class Votable(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    content = models.CharField(max_length=255)
    images = models.FileField(null=True, blank=True)
    created = models.DateTimeField(auto_now_add=True)
    updated = models.DateTimeField(auto_now=True)

class Upvote(models.Model):
     user = models.ForeignKey(User, on_delete=models.CASCADE)
     votable = models.ForeignKey(Votable) #on delete user gets back paid upvotes
     paid = models.IntegerField()
     upvote_score = models.IntegerField()
     active = models.BooleanField()
     sold = models.IntegerField(null=True, blank=True)
     created = models.DateTimeField(auto_now_add=True)

class Comment(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    votable = models.ForeignKey(Votable) #on delete user gets back paid upvotes
    content = models.CharField(max_length=255)
    created = models.DateTimeField(auto_now_add=True)
    updated = models.DateTimeField(auto_now=True)

class Like(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    comment = models.ForeignKey(Comment, on_delete=models.CASCADE)
