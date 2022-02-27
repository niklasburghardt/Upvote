from .permissions import IsOwnerOrReadOnly
from rest_framework import permissions


class OwnerPermissionMixin():
    permission_classes = [IsOwnerOrReadOnly]
