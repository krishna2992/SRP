from django.contrib import admin
from django.db import models
from .models import Post, Attachment, ClassTime, Option
# Register your models here.

class ClassTimeAdmin(admin.ModelAdmin):
    list_display = ('subject','day','start','end',)
    list_filter = ('day',)
    search_fields = (
        "subject__name",
        "subject__code",
    )

class OptionAdmin(admin.ModelAdmin):
    list_display = ('name', 'subjects','internship','project','sem','branch',)
    list_filter = ('sem','branch',)
    
class AttachmentAdmin(admin.ModelAdmin):
    list_display = ('name', 'post',)

class PostAdmin(admin.ModelAdmin):
    list_display = ('subject', 'teacher',)
    list_filter = ('sem','branch','techer',)

admin.site.register(Post)
admin.site.register(ClassTime, ClassTimeAdmin)
admin.site.register(Option, OptionAdmin)
admin.site.register(Attachment, AttachmentAdmin)