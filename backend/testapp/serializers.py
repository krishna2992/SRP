from rest_framework import serializers
from .models import LeaveApplication, BonafideApplication

class LeaveApplicationSerializer(serializers.ModelSerializer):
    class Meta:
        model = LeaveApplication
        fields = ['id', 'student', 'startDate', 'numberOfDays', 'reason', 'status', 'attachment']


class LeaveApplicationWithStudentSerializer(serializers.ModelSerializer):
    name = serializers.CharField(source='student.name', read_only=True)
    roll = serializers.CharField(source='student.roll', read_only=True)

    class Meta:
        model = LeaveApplication
        fields = ('id', 'name', 'roll', 'startDate', 'numberOfDays', 'reason', 'status', 'attachment')

class BonafideApplicationSerializer(serializers.ModelSerializer):
    class Meta:
        model = BonafideApplication
        fields = ['id', 'student', 'body', 'status']

class BonafideStudentSerializer(serializers.ModelSerializer):
    name = serializers.CharField(source='student.name', read_only=True)
    roll = serializers.CharField(source='student.roll', read_only=True)
    class Meta:
        model = BonafideApplication
        fields = ['id', 'name', 'roll', 'subject','body', 'status']