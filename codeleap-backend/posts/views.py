from rest_framework import viewsets
from drf_yasg.utils import swagger_auto_schema
from .models import Post
from .serializers import PostSerializer

class PostViewSet(viewsets.ModelViewSet):
    """
    API for managing blog posts.
    """
    queryset = Post.objects.all()
    serializer_class = PostSerializer
    
    @swagger_auto_schema(operation_description="List all posts")
    def list(self, request, *args, **kwargs):
        return super().list(request, *args, **kwargs)
    
    @swagger_auto_schema(operation_description="Create new post")
    def create(self, request, *args, **kwargs):
        return super().create(request, *args, **kwargs)
    
    @swagger_auto_schema(operation_description="Get post details")
    def retrieve(self, request, *args, **kwargs):
        return super().retrieve(request, *args, **kwargs)
    
    @swagger_auto_schema(operation_description="Update post (title and content only)")
    def partial_update(self, request, *args, **kwargs):
        return super().partial_update(request, *args, **kwargs)
    
    @swagger_auto_schema(operation_description="Delete post")
    def destroy(self, request, *args, **kwargs):
        return super().destroy(request, *args, **kwargs)