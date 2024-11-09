from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.response import Response
from rest_framework import status
from .models import Payment, PaymentStatus
from.serializers import PaymentSerializer, StudentPaymentSerializer
from srp.models import Student, Teacher
from django.contrib.auth import authenticate

@api_view(['GET', 'POST'])
def student_payments(request, pk):
    if not request.user:
        return Response(status=status.HTTP_403_FORBIDDEN)
    if request.method == 'GET':
        
        try:
            payments = Payment.objects.filter(student__id=pk)
            data = PaymentSerializer(payments,context={'request': request}, many=True).data
            return Response(data, status=status.HTTP_200_OK)
        except Payment.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)
        
    if request.method == 'POST':
        serializer = PaymentSerializer(data=request.data)
        
        if serializer.is_valid(raise_exception=True):
            try:
                student = Student.objects.get(pk=pk)
                serializer.validated_data['student'] = student
                amount = serializer.validated_data['amount']
                student.amountPaid+=amount
                student.save()
                serializer.save()   
                
                return Response(status=status.HTTP_201_CREATED)
            except Student.DoesNotExist:
                
                return Response({'msg':'Student Does Not Exist'}, status=status.HTTP_400_BAD_REQUEST)        
        
        return Response(status=status.HTTP_400_BAD_REQUEST)
    
@api_view(['POST'])
def verifyPayment(request, pk):
    if not request.user:
        return Response(status=status.HTTP_403_FORBIDDEN)
    if not request.user.is_staff:
        return Response(status=status.HTTP_403_FORBIDDEN)
    
    
    if request.method == 'POST':
        try:
            student = Student.objects.get(pk=pk)
            payment = student.payment_status.filter(sem=student.sem)
            if not payment:
                payment = PaymentStatus(student=student, sem=student.sem, is_paid=True)
                payment.save()
            else:
                payment[0].is_paid = True
                payment[0].save()

            student.isCurrentPaid = True
            payment.save()
            if student.isElectivesApproved:
                student.isRegistred = True
            student.save()
            return Response(status=status.HTTP_201_CREATED)
        except Student.DoesNotExist:
            return Response(status=status.HTTP_400_BAD_REQUEST)        

@api_view(['GET'])
def get_paid_stdents(request):
    if request.method == 'GET':
        students = Student.objects.filter(amountPaid__gt=0, isCurrentPaid= False)
        data = StudentPaymentSerializer(students, many=True).data
        return Response(data, status=status.HTTP_200_OK)
    return Response(status=status.HTTP_400_BAD_REQUEST)

