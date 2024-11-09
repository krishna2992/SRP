from django.urls import path, include
from .views import student_payments, get_paid_stdents, verifyPayment

urlpatterns = [
    path('student/payment/<int:pk>', student_payments, name='student_payments'),
    path('acad/paid/students', get_paid_stdents, name='get_paid_students'),
    path('verify/student/payments/<int:pk>', verifyPayment, name='verify_student_payment'),
]
