from django.db import models
from srp.models import Student

APPLICATION_STATUS = (
    ('pending', 'Pending'),
    ('approved', 'Approved'),
    ('rejected', 'Rejected'),
)


class LeaveApplication(models.Model):
    student = models.ForeignKey(Student, on_delete=models.CASCADE)
    startDate = models.DateField()
    numberOfDays = models.SmallIntegerField()
    reason = models.CharField(max_length=255)
    status = models.CharField(max_length=20, choices=APPLICATION_STATUS, default='pending')
    attachment = models.FileField(upload_to='leave', null=True)

class BonafideApplication(models.Model):
    student = models.ForeignKey(Student, on_delete=models.CASCADE)
    subject = models.CharField(max_length=50, blank=True)
    body = models.TextField(max_length=255)
    status = models.CharField(max_length=20, choices=APPLICATION_STATUS, default='pending')





