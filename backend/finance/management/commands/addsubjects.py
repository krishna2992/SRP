from django.core.management.base import BaseCommand 
from srp.models import Subject
import pandas as pd
import os

  
class Command(BaseCommand): 
    help = 'Add Subjects into Database'

    def add_arguments(self, parser): 
        parser.add_argument('-f', '--file', type=str, help='Provide File Path to add Subjects into Database')

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
            if not Subject.objects.filter(code=row[1]).exists():
                count+=1
                sub = Subject.objects.create(sem=row[0], code=row[1], name=row[2], credit=row[3], branch=row[4], degree=row[5], type=row[6])
        return f'Total {count} subjects Added'

        