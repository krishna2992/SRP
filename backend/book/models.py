from django.db import models
from django.db.models.signals import post_delete
from django.dispatch import receiver
from django.db import models
from srp.models import Subject, Teacher


WEEK_DAYS = [
    ('monday', 'Monday'),
    ('tuesday', 'Tuesday'),
    ('wednesday', 'Wednesday'),
    ('thursday', 'Thursday'),
    ('friday', 'Friday'),
    ('saturday', 'Saturday'),
    ('sunday', 'Sunday'),
    
]

BRANCH_CHOICES = [
    ('cse', 'Computer Science'),
    ('ece', 'Electronics'),
]

DEGREE_CHOICES = [
    ('btech','B.Tech'),
    ('mtech', 'M.Tech'),
]

class Option(models.Model):
    name = models.CharField(max_length=25, default='')
    subjects = models.SmallIntegerField()
    internship = models.BooleanField(default=False)
    project = models.BooleanField(default=False)
    sem = models.SmallIntegerField(default=1)
    branch = models.CharField(max_length=10, choices=BRANCH_CHOICES, default='cse')
    degree = models.CharField(max_length=10, choices=DEGREE_CHOICES, default='btech')

class Post(models.Model):
    body = models.TextField(null=True)
    subject = models.ForeignKey(Subject, on_delete=models.CASCADE, related_name='posts', blank=True, null=True)
    teacher = models.ForeignKey(Teacher, on_delete=models.CASCADE, related_name='posts', blank=True, null=True)
    
    def __str__(self) -> str:
        return self.body
    
class Attachment(models.Model):
    name = models.CharField(max_length=100)
    post = models.ForeignKey(Post, on_delete=models.CASCADE, related_name='attachments')
    file = models.FileField(upload_to='new_folder', null=True)
    
    def __str__(self) -> str:
        return self.name

class ClassTime(models.Model):
    subject = models.ForeignKey(Subject, on_delete=models.CASCADE, related_name='classtime')
    day = models.CharField(max_length=15, choices=WEEK_DAYS)
    start = models.TimeField()
    end = models.TimeField()
    
    def __str__(self) -> str:
        return self.day


def delete_file_if_unused(model,instance,field,instance_file_field):
    dynamic_field = {}
    dynamic_field[field.name] = instance_file_field.name
    other_refs_exist = model.objects.filter(**dynamic_field).exclude(pk=instance.pk).exists()
    if not other_refs_exist:
        instance_file_field.delete(False)
        

@receiver(post_delete, sender=Attachment)
def delete_file_on_delete(sender, instance, **kwargs):
    for field in sender._meta.concrete_fields:
        if isinstance(field,models.FileField):
            instance_file_field = getattr(instance,field.name)
            delete_file_if_unused(sender,instance,field,instance_file_field)
    