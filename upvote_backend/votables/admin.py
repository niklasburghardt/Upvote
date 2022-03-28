from django.contrib import admin
from .models import BoughtUpvote, Story, Votable, Comment, Upvote
admin.site.register(Votable)
admin.site.register(Comment)
admin.site.register(Upvote)
admin.site.register(BoughtUpvote)
admin.site.register(Story)
