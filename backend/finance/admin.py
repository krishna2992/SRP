from django.contrib import admin
from .models import Payment, PaymentStatus
# Register your models here.

class PaymentAdmin(admin.ModelAdmin):
    list_display = ('utr',  'name',)
    list_filter = ('created_at',)
    search_fields = (
        "utr",
        "student__roll",
    )


class PaymentStatusAdmin(admin.ModelAdmin):
    list_display = ('student',  'sem','is_paid')
    list_filter = ('is_paid','sem',)
    search_fields = (
        "student__roll",
        "student__name",
    )
    


admin.site.register(Payment, PaymentAdmin)
admin.site.register(PaymentStatus, PaymentStatusAdmin)