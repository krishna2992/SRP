
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework import status, viewsets
from rest_framework.response import Response
from .serializers import  LoginSerializer, StudentResultSerializer, StudentSerializer, TeacherSerializer, ResultSubjectSerializer, StudentTeacherSerializer, ElectivesSerializer
from rest_framework import permissions
from rest_framework_simplejwt.views import TokenObtainPairView
from django.contrib.auth import authenticate
import json
from book.views import DefaultsMixin
from .models import Student, Teacher, Subject, StudentResult, ElectiveChoices
from srp.serializers import SubjectSerializer, StudentElectiveSerializer
from finance.models import PaymentStatus

# Create your views here.
class LoginView(TokenObtainPairView):
    # This view should be accessible also for unauthenticated users.
    permission_classes = (permissions.AllowAny,)

    def post(self, request, format=None):
        serializer = LoginSerializer(data=self.request.data,
            context={ 'request': self.request })
        if serializer.is_valid(raise_exception=True):
            user = serializer.validated_data['user']
            data, type = None, None
            if user:
                if hasattr(user, 'student_user'):
                    student = user.student_user
                    data, type = StudentSerializer(instance=user.student_user).data, 'student'
                    data['isPaid'] = False
                    if student.payment_status.filter(sem=student.sem) and student.payment_status.filter(sem=student.sem)[0].is_paid:
                        data['isPaid'] = True
                elif hasattr(user, 'teacher_user'):
                    data, type = TeacherSerializer(instance=user.teacher_user).data, 'teacher'
                else:
                    return Response(status=status.HTTP_400_BAD_REQUEST)        
            response = super(LoginView, self).post(request)
            data['type'] = type
            res = json.dumps({'type':type, 'user':data, 'token':response.data})
            return Response(res, status=status.HTTP_202_ACCEPTED)
        return Response(json.dumps({'msg':'User Not Found'}), status=status.HTTP_400_BAD_REQUEST)
    
class StudentView(DefaultsMixin, viewsets.ModelViewSet):
    queryset = Student.objects.all()
    serializer_class = StudentSerializer

    
@api_view(['GET'])
def get_student_result(request, pk):
    semesters = []
    if request.method == 'GET':
        try:
            results = StudentResult.objects.filter(student__id=pk)
            for key, value in request.GET.items():
                if key=='sem':
                    if value:
                        semesters.append(int(value))
                if key == 'subject':
                    if value:
                        results = results.filter(subject__code=value)
            data = StudentResultSerializer(results, many=True).data
            res = []
            for element in data:
                current = element['subject']
                current['grade'] = element['grade']['grade']
                res.append(current)
            return Response(res, status=status.HTTP_200_OK)
        
        except StudentResult.DoesNotExist:
            
            return Response({'data':'Result Does Not Exist'}, status=status.HTTP_400_BAD_REQUEST)
    
@api_view(['GET'])
def get_electives_selected_students(request, pk=None):
    if request.method == 'GET':
        if pk:
            try:
                student = Student.objects.get(pk=pk)
                data = StudentTeacherSerializer(instance=student).data
                return Response(data, status=status.HTTP_200_OK)
            except Student.DoesNotExist:
                return Response({'msg':'Student DoesNot Exist'}, status=status.HTTP_400_BAD_REQUEST)
            
        students = Student.objects.filter(isElectivesChoosed=True, isElectivesApproved=False)
        data = StudentTeacherSerializer(students, many=True).data
        return Response(data, status=status.HTTP_200_OK)
    
@api_view(['POST'])
def teacher_sign_students(request):
    if not request.user:
        return Response(status=status.HTTP_403_FORBIDDEN)
    if not request.user.is_staff:
        return Response(status=status.HTTP_403_FORBIDDEN)
    
    refill = False
    if request.method == 'POST':
        data = request.data
        if not data['student']:
            return Response(status=status.HTTP_400_BAD_REQUEST)
        
        
        if 'refill' in data:
            refill = data['refill']
        
        try:
            student = Student.objects.get(pk=data['student'])
            

            try:
                
                
                if not refill:
                    student.isElectivesApproved = True
                    payment_status = student.payment_status.filter(sem=student.sem)
                    if payment_status and payment_status[0].is_paid and student.isCurrentPaid:
                        student.isRegistred = True
                    student.save()
                    return Response(status=status.HTTP_202_ACCEPTED)
                if refill:
                    student.isElectivesChoosed = False
                    student.subjects.clear()
                    student.save()
                    return Response(status=status.HTTP_202_ACCEPTED)
            except Teacher.DoesNotExist:
                return Response(status=status.HTTP_400_BAD_REQUEST)    
        except Student.DoesNotExist:
            return Response(status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET'])
def get_electives_options(request, sem):
    if request.method == 'GET':
        try:
            subjects = Subject.objects.filter(sem=sem, type__in=['compulsory', 'elective', 'HSS'])
            data = ElectivesSerializer(subjects, many=True).data
            return Response(data, status=status.HTTP_200_OK)
        except Subject.DoesNotExist:
            return Response(status=status.HTTP_400_BAD_REQUEST)
    return Response(status=status.HTTP_400_BAD_REQUEST)


@api_view(['POST'])
def get_subjectwise_students(request):
    if request.method == 'POST':
        choice_num, sem, branch, degree = 3, 8, 'CSE', 'btech'
        if 'semester' in request.data:
            sem = int(request.data['semester']);
        if 'branch' in request.data:
            branch = request.data['branch']
        if 'degree' in request.data:
            degree = request.data['degree']
        if 'choice' in request.data:
            choice_num = int(request.data['choice']);
        try:
            subject = Subject.objects.filter(degree=degree, branch=branch, sem=sem)
            res = []
            for sub in subject:
                try:
                    l = sub.choices.filter(choice_num=choice_num).values_list('student', flat=True)
                    students = Student.objects.filter(pk__in=l).order_by('-cpi')
                    if students:
                        stu_data = StudentElectiveSerializer(students, many=True).data
                        sub_data = SubjectSerializer(instance=sub).data
                        sub_data['students'] = stu_data
                        res.append(sub_data)
                except Student.DoesNotExist:
                    print('Student Does Not Exist')
        except Subject.DoesNotExist:
            return Response(status=status.HTTP_400_BAD_REQUEST)
        return Response(res, status=status.HTTP_200_OK)


@api_view(['POST'])
def distribute_electives(request):
    if request.method == 'POST':
        try:
            for ele in request.data:
                if 'subject' in ele:
                    subject = Subject.objects.get(pk=ele['subject'])
                    students = Student.objects.filter(pk__in=ele['students'])
                    for student in students:
                        student.subjects.add(subject)
            return Response(status=status.HTTP_200_OK)
        except ElectiveChoices.DoesNotExist:
            return Response(status=status.HTTP_400_BAD_REQUEST)
    return Response(status=status.HTTP_400_BAD_REQUEST)


@api_view(['POST'])
def initial_choice_submit(request):
    if request.method == 'POST':
        print(request.data)
        return Response(status=status.HTTP_200_OK)
    
@api_view(['GET'])
def get_electives_selected_students2(request, pk=None):
    if request.method == 'GET':
        if pk:
            try:
                student = Student.objects.get(pk=pk)
                data = StudentTeacherSerializer(instance=student).data
                return Response(data, status=status.HTTP_200_OK)
            except Student.DoesNotExist:
                return Response({'msg':'Student DoesNot Exist'}, status=status.HTTP_400_BAD_REQUEST)

        students = Student.objects.filter(isCurrentPaid=True, isElectivesChoosed=True, isElectivesApproved=False)
        data = StudentTeacherSerializer(students, many=True).data
        return Response(data, status=status.HTTP_200_OK)


@api_view(['GET'])
def change_password(request):
    username = request.user.username
    password = request.data.get('current_password')
    user = authenticate(username=username, password=password)

    if user is None:
        return Response({'error': 'Failed to re-authenticate user.'}, status=status.HTTP_400_BAD_REQUEST)
    
    new_password = request.data.get('new_password')
    confirm_new_password = request.data.get('confirm_new_password')

    if new_password != confirm_new_password:
        return Response({'error': 'New passwords do not match.'}, status=status.HTTP_400_BAD_REQUEST)
    
    user.set_password(new_password)
    user.save()

    return Response({'msg': 'Password changed successfully.'}, status=status.HTTP_200_OK)