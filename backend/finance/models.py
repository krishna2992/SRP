from django.db import models
from srp.models import Student
# Create your models here.
class Payment(models.Model):
    amount = models.IntegerField(default=0)
    utr = models.CharField(unique=True, max_length=25)
    student = models.ForeignKey(Student, on_delete=models.CASCADE, related_name='receipts')
    name = models.CharField(max_length=25)
    purpose = models.CharField(max_length=100)
    created_at = models.DateTimeField(auto_now=True)
    receipt = models.FileField(upload_to='finance/receipts', null=True, blank=True)
    
class PaymentStatus(models.Model):
    student = models.ForeignKey(Student, on_delete=models.CASCADE, related_name='payment_status')
    sem = models.SmallIntegerField(default=1)
    is_paid = models.BooleanField(default=False)
    
    def __str__(self):
        return self.student.name
    
    