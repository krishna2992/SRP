from django.contrib import admin
from .models import LeaveApplication, BonafideApplication

admin.site.register(LeaveApplication)
admin.site.register(BonafideApplication)