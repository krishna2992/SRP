from django.db import models
from django.contrib.auth.models import User

SUBJECT_TYPES =[
    ('compulsory', 'Compulsory'),
    ('elective', 'Elective'),
    ('project', 'Project'),
    ('internship', 'Internship'),
    ('HSS', 'HSS'),
]

SUBJECT_BRANCH = [
    ('cse', 'CSE'),
    ('ece', 'ECE'),
    ('both', 'Both'),
]

DEGREE_CHOICES = [
    ('btech', 'B.TECH'),
    ('mtech', 'M.TECH'),
]

class Subject(models.Model):
    code = models.CharField(unique=True,max_length=10)
    name = models.CharField(max_length=50)
    sem  = models.SmallIntegerField(default=1)
    type = models.CharField(max_length=15, choices=SUBJECT_TYPES, default="compulsory")
    branch = models.CharField(max_length=10, choices=SUBJECT_BRANCH, default='cse')
    degree = models.CharField(max_length=10, choices=DEGREE_CHOICES, default='btech')
    credit = models.SmallIntegerField(default=0)
    
    def __str__(self):
        return self.code+' '+self.name

class Student(models.Model):
    email = models.EmailField(blank=False, null=False)
    roll = models.IntegerField(unique=True,blank=False, null=False)
    name = models.CharField(blank=False, null=False, max_length=100)
    branch = models.CharField(max_length=50, default='cse')
    course = models.CharField(max_length=10, default='btech')
    contact =models.CharField(max_length=13,null=True, blank=True)
    city = models.CharField(max_length=20,null=True, blank=True)
    state = models.CharField(max_length=20,null=True, blank=True)
    pincode = models.CharField(max_length=6,null=True, blank=True)
    addr_line = models.CharField(max_length=60, null=True, blank=True)
    alter_email = models.EmailField(null=True, blank=True)
    
    sem = models.SmallIntegerField(default=1)
    subjects = models.ManyToManyField(Subject, related_name='students', blank=True)
    
    isInitialChoosed = models.BooleanField(default=False)
    isElectivesChoosed = models.BooleanField(default=False)
    isElectivesApproved = models.BooleanField(default=False)
    isCurrentPaid = models.BooleanField(default=False)
    amountPaid = models.IntegerField(default=0)
    isRegistred = models.BooleanField(default=False)
    
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name='student_user',null=True, blank=True)
    cpi = models.FloatField(default=0)
    def __str__(self):
        return self.name


class Teacher(models.Model):
    email = models.EmailField(blank=False, null=False)
    name = models.CharField(blank=False, null=False, max_length=100)
    contact =models.CharField(max_length=13,null=True, blank=True)
    city = models.CharField(max_length=20, null=True, blank=True)
    state = models.CharField(max_length=20, null=True, blank=True)
    pincode = models.CharField(max_length=6, null=True, blank=True)
    addr_line = models.CharField(max_length=60, null=True, blank=True)
    #Subjects Taughty by Teacher
    subjects = models.ManyToManyField(Subject, related_name='teachers', blank=True)
    #User
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name='teacher_user', null=True, blank=True)
    
    
    def __str__(self):
        return self.name
    
GRADE_CHOICES = [
    ('AA','AA'),
    ('AB','AB'),
    ('BB','BB'),
    ('BC','BC'),
    ('CC','CC'),
    ('CD','CD'),
    ('DD','DD'),
    ('F','F'),
    ('NP','NP'),
    ('I', 'I'),
]

class Grade(models.Model):
    grade = models.CharField(unique=True,max_length=3, choices=GRADE_CHOICES)
    points = models.SmallIntegerField(default=0)
    
    def __str__(self):
        return self.grade

class StudentResult(models.Model):
    student = models.ForeignKey(Student, on_delete=models.CASCADE)
    subject = models.ForeignKey(Subject, on_delete=models.CASCADE)
    grade = models.ForeignKey(Grade, on_delete=models.CASCADE)
    
    def __str__(self):
        return str(self.student.roll)+' '+self.subject.code
    

class ElectiveChoices(models.Model):
    student = models.ForeignKey(Student, on_delete=models.CASCADE, related_name='choices')
    choice_num = models.SmallIntegerField(default=1)
    choice = models.ForeignKey(Subject, on_delete=models.CASCADE, related_name='choices')
    
    def __str__(self) -> str:
        return str(self.student.name)