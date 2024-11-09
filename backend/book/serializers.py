from django.db import models
from rest_framework import serializers

from srp.models import Subject, Teacher
from .models import Post, Attachment, ClassTime, Option



class AttachmentSerializer(serializers.ModelSerializer):
    
    class Meta:
        model = Attachment
        fields = ('file',)

class ClassTimeSerializer(serializers.ModelSerializer):
    class Meta:
        model = ClassTime
        fields = ('day','start', 'end',)

class TeacherPostSerializer(serializers.ModelSerializer):
    class Meta:
        model = Teacher
        fields = ('id', 'name',)
    
class PostSerializer(serializers.ModelSerializer):
    attachments = AttachmentSerializer(read_only=True, many=True)
    teacher  = TeacherPostSerializer(read_only=True)
    class Meta:
        model = Post
        fields =('id', 'body', 'attachments','teacher',)

class SubjectSerializer(serializers.ModelSerializer):
    class Meta:
        model = Subject
        fields = ('id', 'code','name', 'sem', 'branch','type','credit',)

class SubjectPostSerializer(serializers.ModelSerializer):
    posts = PostSerializer(read_only=True, many=True)
    
    class Meta:
        model = Subject
        fields = ('id', 'posts',)
        

class SubjectClassTimeSerializer(serializers.ModelSerializer):
    classtime = ClassTimeSerializer(read_only=True, many=True)
    class Meta:
        model = Subject
        fields = ('id',  'classtime',)

class OptionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Option
        fields = ('id',  'name','subjects', 'project', 'internship',)




class AttachmentSerializer2(serializers.ModelSerializer):
    class Meta:
        model = Attachment
        fields = ['id', 'name', 'file']

class PostSerializer2(serializers.ModelSerializer):
    attachments = AttachmentSerializer(many=True, required=False)

    class Meta:
        model = Post
        fields = ['id', 'body', 'subject', 'teacher', 'attachments']

    def create(self, validated_data):
        attachments_data = validated_data.pop('attachments', [])
        post = Post.objects.create(**validated_data)
        
        for attachment_data in attachments_data:
            Attachment.objects.create(post=post, **attachment_data)
        
        return post
