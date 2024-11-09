from django.db import models
from django.db.models import fields
from rest_framework import serializers
from django.contrib.auth import authenticate
from .models import Grade, Student, StudentResult, Teacher, Subject


class LoginSerializer(serializers.Serializer):
    """
    This serializer defines two fields for authentication:
      * username
      * password.
    It will try to authenticate the user with when validated.
    """
    username = serializers.CharField(
        label="Username",
        write_only=True
    )
    password = serializers.CharField(
        label="Password",
        # This will be used when the DRF browsable API is enabled
        style={'input_type': 'password'},
        trim_whitespace=False,
        write_only=True
    )

    def validate(self, attrs):
        username = attrs.get('username')
        password = attrs.get('password')

        if username and password:
            # Try to authenticate the user using Django auth framework.
            user = authenticate(request=self.context.get('request'),
                                username=username, password=password)
            if not user:
                # If we don't have a regular user, raise a ValidationError
                msg = 'Access denied: wrong username or password.'
                raise serializers.ValidationError(msg, code='authorization')
        else:
            msg = 'Both "username" and "password" are required.'
            raise serializers.ValidationError(msg, code='authorization')
        
        attrs['user'] = user
        return attrs

class SubjectSerializer(serializers.ModelSerializer):
    class Meta:
        model = Subject
        fields = ('id','code', 'name','sem','credit',)

class ElectivesSerializer(serializers.ModelSerializer):
    class Meta:
        model = Subject
        fields = ('id','code', 'name', 'type','credit',)
        
class StudentSerializer(serializers.ModelSerializer):
    subjects = SubjectSerializer(read_only=True, many=True)
    class Meta:
        model = Student
        fields = ('id','email','name', 'roll', 'branch', 'course', 'contact', 'city', 'state', 'pincode', 'addr_line', 'alter_email', 'sem', 'subjects','isElectivesChoosed', 'isElectivesApproved','isRegistred','isInitialChoosed',)

class TeacherSerializer(serializers.ModelSerializer):
    subjects = SubjectSerializer(read_only=True, many=True)
    class Meta:
        model = Teacher
        fields = ('id','email', 'name', 'contact', 'city', 'state', 'pincode', 'addr_line', 'subjects')
        
class ResultSubjectSerializer(serializers.ModelSerializer):
    class Meta:
        model = Subject
        fields = ('id', 'code', 'name', 'sem', 'credit',)

class GradeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Grade
        fields = ('grade',)
  
class StudentResultSerializer(serializers.ModelSerializer):
    subject = ResultSubjectSerializer(read_only=True)
    grade = GradeSerializer(read_only=True)
    class Meta:
        model = StudentResult
        fields = ('subject','grade',    )
        
class StudentTeacherSerializer(serializers.ModelSerializer):
    subjects = SubjectSerializer(read_only=True, many=True)
    class Meta:
        model = Student
        fields = ('id','email','name', 'roll', 'branch', 'course',  'sem', 'subjects',)

class StudentElectiveSerializer(serializers.ModelSerializer):
    class Meta:
        model = Student
        fields = ('id','name', 'roll', 'cpi',)
