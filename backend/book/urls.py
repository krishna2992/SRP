from .views import  SubjectViewSet, PostViewSet, AttachmentViewSet, subject_posts, ClassTimeViewSet, get_time_table_day, get_elective_options, get_backlogs, submitStudentElectives, getStudent, personalUpdate, delete_post
from rest_framework.routers import DefaultRouter
from django.urls import path

urlpatterns = [
    path('posts/subjects/<int:pk>', subject_posts, name='sub_posts'),
    path('classtime', get_time_table_day, name='class_time'),
    path('option/electives', get_elective_options, name='option_electives'),
    path('student/backlogs/<int:pk>', get_backlogs, name='get_backlogs'),
    path('student/submit/electives/<int:pk>', submitStudentElectives, name='submitElectives'),
    path('get/student/<int:pk>', getStudent, name='get_student'),
    path('student/personal/update/<int:pk>', personalUpdate, name='personalUpdate'),
    path('teacher/delete/post/<int:pk>',  delete_post, name='delete_post'),
]


router = DefaultRouter(trailing_slash=False)
router.register(r'subjects', SubjectViewSet)
router.register(r'attachments', AttachmentViewSet)
router.register(r'posts', PostViewSet)
router.register(r'classtime', ClassTimeViewSet)