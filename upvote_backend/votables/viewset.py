from rest_framework import viewsets
from .models import Votable
from .serializers import VotableSerializer


class VotableViewSet(viewsets.ModelViewSet):
    queryset = Votable.objects.all()
    serializer_class = VotableSerializer
    lookup = 'pk'
