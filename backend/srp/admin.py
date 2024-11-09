from django.contrib import admin
from .models import Student, Teacher, Subject, StudentResult, Grade, ElectiveChoices
# Register your models here.


class StudentAdmin(admin.ModelAdmin):
    list_display = ('roll', 'name', 'sem', 'email', 'isRegistred',)
    list_filter = ('isRegistred','sem',)
    search_fields = (
        "name",
        "roll",
        "isRegistred",
    )

class SubjectAdmin(admin.ModelAdmin):
    list_display = ('code', 'name', 'sem',)
    list_filter = ('sem',)
    search_fields = (
        "name",
        "code",
    )

class TeacherAdmin(admin.ModelAdmin):
    list_display = ( 'name', 'email')
    search_fields = (
        "name",
        "email",
    )

class ResultAdmin(admin.ModelAdmin):
    list_display = ( 'student', 'subject', 'grade',)
    list_filter = ('student__roll',)
    search_fields = (
        "subject__name",
        "student__name",
        "student__roll",
        "subject__code",
        
    )

class ChoicesAdmin(admin.ModelAdmin):
    list_display = ( 'student','choice', 'choice_num',)
    list_filter = ('choice_num','choice',)
    search_fields = (
        "student__name",
        "student__roll",
    )

admin.site.register(Student, StudentAdmin)
admin.site.register(Teacher, TeacherAdmin)
admin.site.register(Subject, SubjectAdmin)
admin.site.register(StudentResult, ResultAdmin)
admin.site.register(ElectiveChoices, ChoicesAdmin)
admin.site.register(Grade)
