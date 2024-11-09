from django.core.management.base import BaseCommand 
from django.contrib.auth.models import User
from srp.models import Student
import pandas as pd
import os

  
class Command(BaseCommand): 
    help = 'Add Students into Database'

    def add_arguments(self, parser): 
        parser.add_argument('-f', '--file', type=str, help='Provide File Path to add Students into Database')

    def handle(self, *args, **kwargs):

        filepath = kwargs['file']
        

        if not filepath:
            return 'Enter a Valid File \nTerminating Database Update'
        if not os.path.isfile(filepath):
            return 'Invalid File\nTerminating Database Update'
        
        df = pd.read_csv(filepath)
        values = df.values.tolist()
        
        count = 0
        for row in values:
            
            if not Student.objects.filter(roll=row[0]).exists():
                count+=1
                user = User.objects.create_user(username=row[1].split('@')[0], password=row[1].split('@')[0])
                stu = Student.objects.create(roll=row[0], email=row[1], name=row[2],branch=row[3],course=row[4], sem=row[5], user=user)

        return f'Total {count} Students Added'