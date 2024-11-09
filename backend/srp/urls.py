from django.urls import path
from .views import LoginView, StudentView, get_student_result, get_electives_selected_students, teacher_sign_students, get_electives_options, get_subjectwise_students, distribute_electives, initial_choice_submit, change_password
from rest_framework_simplejwt.views import  TokenRefreshView

urlpatterns = [
    path('login', LoginView.as_view(), name='login'),
    path('token/refresh', TokenRefreshView.as_view(), name='token_refresh'),
    path('students/result/<int:pk>', get_student_result, name='student_results'),
    path('teacher/students', get_electives_selected_students, name='unelected_student'),
    path('teacher/students/<int:pk>', get_electives_selected_students, name='unelected_student'),
    path('teacher/students/sign', teacher_sign_students, name='sign_student'),
    path('student/electives/options/<int:sem>', get_electives_options, name='elective_options'),
    path('student/subject_wise/students', get_subjectwise_students, name='subjectwise_students'),
    path('acad/distribute/students/elective', distribute_electives, name='elective_distributer'),
    path('student/initial/choices', initial_choice_submit, name='initial_choice_submit'),
    path('change/password', change_password, name='change_password'),
    
]