from rest_framework import serializers
from .models import Post

class PostSerializer(serializers.ModelSerializer):
    """
    Serializer for Post model.
    """
    
    class Meta:
        model = Post
        fields = ['id', 'username', 'created_datetime', 'title', 'content']
        read_only_fields = ['id', 'created_datetime']

    def update(self, instance, validated_data):
        instance.title = validated_data.get('title', instance.title)
        instance.content = validated_data.get('content', instance.content)
        instance.save()
        return instance