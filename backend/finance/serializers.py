from rest_framework import serializers
from .models import Payment
from srp.models import Student

class PaymentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Payment
        fields =('utr', 'name', 'receipt', 'purpose', 'created_at', 'amount',)

class StudentPaymentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Student
        fields = ('id','name', 'roll', 'amountPaid',)