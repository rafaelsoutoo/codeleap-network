from django.contrib import admin
from django.urls import path, include
from rest_framework.routers import DefaultRouter
from posts.views import PostViewSet
from drf_yasg.views import get_schema_view
from drf_yasg import openapi
from rest_framework import permissions

schema_view = get_schema_view(
    openapi.Info(
        title="CodeLeap API",
        default_version='v1',
        description="REST API for blog posts",
    ),
    public=True,
    permission_classes=(permissions.AllowAny,),
)

# Router
router = DefaultRouter()
router.register(r'careers', PostViewSet, basename='career')

urlpatterns = [
    path('admin/', admin.site.urls),
    path('', include(router.urls)),
    path('docs/', schema_view.with_ui('swagger', cache_timeout=0), name='docs'),
]