from rest_framework.routers import DefaultRouter
from votables.viewset import VotableViewSet

router = DefaultRouter()
router.register('votables', VotableViewSet, basename="votables")

urlpatterns = router.urls