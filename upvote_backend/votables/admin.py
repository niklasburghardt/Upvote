from django.contrib import admin
from .models import BoughtUpvote, Votable, Comment, Upvote
admin.site.register(Votable)
admin.site.register(Comment)
admin.site.register(Upvote)
admin.site.register(BoughtUpvote)
