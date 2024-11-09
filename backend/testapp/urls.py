from django.urls import path
from . import views

urlpatterns = [
    path('leave/submit', views.post_leave_application, name='submit_leave'),
    path('leaves', views.get_applications_by_status, name='status_leave'),
    path('leave/status/change/<int:pk>', views.update_application_status, name='change_status'),
    path('bonafide/submit', views.post_bonafide_application, name='submit_bonafide'),
    path('bonafides', views.get_bonafide_by_status, name='status_bonafide'),
    path('bonafide/status/change/<int:pk>', views.update_bonafide_status, name='change_bonafide_status'),
]   
