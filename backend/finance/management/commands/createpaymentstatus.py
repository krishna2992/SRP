from django.core.management.base import BaseCommand 
from srp.models import Student
from finance.models import PaymentStatus
  
class Command(BaseCommand): 
    help = 'Creates Payment Status for each Student in Database for current semester'
    def handle(self, *args, **kwargs):
        students = Student.objects.all()
        for student in students:
            if not PaymentStatus.objects.filter(student=student, sem=student.sem).exists():
                PaymentStatus.objects.create(student=student, sem=student.sem)
        print('Operation Completed Successfully')
        
        