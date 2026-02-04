from django.db import models

class Post(models.Model):
    """
    Model representing a blog post.
    
    Fields:
    - username: Author's name
    - created_datetime: Timestamp of post creation
    - title: Post title
    - content: Post content
    """
    username = models.CharField(max_length=100)
    created_datetime = models.DateTimeField(auto_now_add=True)
    title = models.CharField(max_length=255)
    content = models.TextField()

    class Meta:
        ordering = ['-created_datetime']  # Most recent first

    def __str__(self):
        return f"{self.username} - {self.title}"