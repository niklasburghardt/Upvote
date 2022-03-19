from django.db import models
from django.contrib.auth.models import User


def getImagePath(instance, filename):
    return "/api/".join(["images", str(instance.id)+"-" + filename])


class Votable(models.Model):
    user = models.ForeignKey(
        User, related_name="votables", on_delete=models.CASCADE, null=False, blank=False)
    content = models.CharField(max_length=255)
    created = models.DateTimeField(auto_now_add=True)
    updated = models.DateTimeField(auto_now=True)
    image = models.ImageField(
        null=True, blank=True, upload_to=getImagePath)

    def __str__(self):
        return self.content[0:50]

    class Meta:
        ordering = ["-created"]


class Upvote(models.Model):
    user = models.ForeignKey(
        User, on_delete=models.CASCADE, related_name="upvotes")
    # on delete user gets back paid upvotes
    votable = models.ForeignKey(
        Votable, on_delete=models.CASCADE, related_name="upvotes")
    paid = models.IntegerField()
    # calculated when created
    upvote_score = models.IntegerField()
    active = models.BooleanField()
    sold = models.IntegerField(null=True, blank=True)
    created = models.DateTimeField(auto_now_add=True)


class Comment(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    # on delete user gets back paid upvotes
    votable = models.ForeignKey(
        Votable, on_delete=models.CASCADE, related_name="comments")
    content = models.CharField(max_length=255)
    created = models.DateTimeField(auto_now_add=True)
    updated = models.DateTimeField(auto_now=True)


class Like(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    comment = models.ForeignKey(
        Comment, on_delete=models.CASCADE, related_name="likes")
    created = models.DateTimeField(auto_now_add=True)


class Share(models.Model):
    sent = models.ForeignKey(
        User, on_delete=models.DO_NOTHING, related_name="sent")
    received = models.ForeignKey(
        User, on_delete=models.DO_NOTHING, related_name="received")
    date = models.DateTimeField(auto_now_add=True)
    votable = models.ForeignKey(
        Votable, related_name="shares", on_delete=models.CASCADE)


class Story(models.Model):
    votable = models.ForeignKey(
        Votable, related_name="stories", on_delete=models.CASCADE)
    user = models.ForeignKey(
        User,  related_name="stories", on_delete=models.CASCADE)
    created = models.DateTimeField(auto_now_add=True)
    comment = models.CharField(max_length=140)
