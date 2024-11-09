from rest_framework import permissions, serializers,viewsets
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.response import Response
from rest_framework import status
from srp.models import Subject, StudentResult, Student
from .models import Post, Attachment, ClassTime, Option
from .serializers import ClassTimeSerializer, PostSerializer, AttachmentSerializer, SubjectPostSerializer, OptionSerializer, SubjectSerializer
import datetime
from srp.serializers import StudentResultSerializer, StudentSerializer
# Create your views here.

WEEK_DAYS = [
    ('monday', 'Monday'),
    ('tuesday', 'Tuesday'),
    ('wednesday', 'Wednesday'),
    ('thursday', 'Thursday'),
    ('friday', 'Friday'),
    ('saturday', 'Saturday'),
    ('sunday', 'Sunday'),
]

class DefaultsMixin(object):
    
    permission_classes = (
        permissions.AllowAny,
    )
    
    paginate_by = 25
    paginate_by_param = 'page_size'
    max_paginate_by = 100


class PostViewSet(DefaultsMixin, viewsets.ModelViewSet):
    queryset = Post.objects.all()
    serializer_class = PostSerializer
    
    
class AttachmentViewSet(DefaultsMixin, viewsets.ModelViewSet):
    queryset = Attachment.objects.all()
    serializer_class = AttachmentSerializer
    
class SubjectViewSet(DefaultsMixin, viewsets.ModelViewSet):
    queryset = Subject.objects.all()
    serializer_class = SubjectSerializer

class ClassTimeViewSet(DefaultsMixin, viewsets.ModelViewSet):
    queryset = ClassTime.objects.all()
    serializer_class = ClassTimeSerializer


@api_view(['DELETE'])
def delete_post(request, pk):
    if request.method  == 'DELETE':
        try:
            post = Post.objects.get(pk=pk).delete()
            return Response(status=status.HTTP_204_NO_CONTENT)
        except Post.DoesNotExist:
            return Response(status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET', 'POST'])
def subject_posts(request, pk):
        if request.method == 'GET':
            res, stat = None, None
            try:
                subject = Subject.objects.get(id=pk)
                data = SubjectPostSerializer(instance=subject , context={'request': request}).data  
                stat = status.HTTP_200_OK
            except Post.DoesNotExist:
                data = {'Does not Exist'}
                stat = status.HTTP_404_NOT_FOUND
            
            return Response(data, status=stat)
        
        if request.method == 'POST':
            body = request.data['body']
            res, stat = None, None
            try:
                subject = Subject.objects.get(id=pk)
                post = Post(body=body, subject=subject)    
                post.save()
                for key, value in request.data.items():
                    if key[:4] == 'file':
                        atta = Attachment(name=value.name, post=post, file=value)
                        atta.save()
                stat = status.HTTP_201_CREATED
                
            except Subject.DoesNotExist:
                stat = status.HTTP_404_NOT_FOUND
                
            return Response(status=stat)


@api_view(['GET'])
def get_time_table_day(request):
    if request.method == 'GET':
        week_day = WEEK_DAYS[datetime.date.today().weekday()][0]
        classtime = ClassTime.objects.filter(day=week_day)
        data = ClassTimeSerializer(classtime, many=True).data
        return Response(data=data, status=status.HTTP_200_OK)
    
@api_view(['POST'])
def get_elective_options(request):
    sem, branch, degree = 1, 'cse', 'btech' 
    if request.method == 'POST':
        if 'sem' in request.data:
            sem = int(request.data['sem'])
        if 'branch' in request.data:
            branch = request.data['branch']
        if 'degree' in request.data:
            degree = request.data['degree']
        try:
            options = Option.objects.filter(sem=sem, branch=branch, degree=degree)
            try:
                subjects = Subject.objects.filter(branch__in=[branch, 'both'], sem=sem, type__in=['compulsory', 'elective', 'HSS'])
                res = {}
                res['options'] = OptionSerializer(options, many=True).data
                res['subjects'] = SubjectSerializer(subjects, many=True).data
                return Response(res, status=status.HTTP_200_OK)
            except Subject.DoesNotExist:
                return Response(status=status.HTTP_400_BAD_REQUEST)
        except Option.DoesNotExist:
            return Response(status=status.HTTP_400_BAD_REQUEST)
        


@api_view(['GET'])
def get_backlogs(request, pk):
    if request.method == 'GET':
        try:
            results = StudentResult.objects.filter(student__pk=pk, grade__grade__in=['F', 'I', 'NP'])
            data = StudentResultSerializer(results, many=True).data
            return Response(data, status=status.HTTP_200_OK)
        except StudentResult.DoesNotExist:
            return Response(status=status.HTTP_400_BAD_REQUEST)

@api_view(['POST'])
def submitStudentElectives(request, pk):
    if request.method == 'POST':
        data = request.data
        try:
            student = Student.objects.get(pk=pk)
            try:
                subjects = Subject.objects.filter(id__in=data['subjects'])
                backlogs = Subject.objects.filter(id__in=data['backlogs'])
                print(backlogs)
                student.subjects.add(*subjects)
                student.subjects.add(*backlogs)
                student.isElectivesChoosed = True
                student.save()
                data = StudentSerializer(instance=student).data
                data['type'] = 'student'
                return Response(data, status=status.HTTP_200_OK)
            except Subject.DoesNotExist:
                return Response(status=status.HTTP_400_BAD_REQUEST)    
        except Student.DoesNotExist:
            return Response(status=status.HTTP_400_BAD_REQUEST)

        return Response(status=status.HTTP_200_OK)
    
@api_view(['GET'])
def getStudent(request, pk):
    if request.method == 'GET':
        try:
            student  = Student.objects.get(pk=pk)
            data = StudentSerializer(instance=student).data
            data['type'] = 'student'
            return Response(data, status=status.HTTP_200_OK)
        except Student.DoesNotExist:
            return  Response(status=status.HTTP_400_BAD_REQUEST)


@api_view(['POST'])
def personalUpdate(request, pk):
    if request.method  == 'POST':
        try:
            student = Student.objects.get(pk=pk)
            ser = StudentSerializer(student, data=request.data, partial=True)
            if not ser.is_valid():
                return Response(status=status.HTTP_400_BAD_REQUEST)
            ser.save()
            data = StudentSerializer(instance=student).data
            data['type'] = 'student'
            return Response(data, status=status.HTTP_202_ACCEPTED)
        except  Student.DoesNotExist:
            return Response(status=status.HTTP_400_BAD_REQUEST)


