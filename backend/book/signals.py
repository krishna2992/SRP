# from django.db.models.signals import post_delete
# from django.dispatch import receiver
# from django.db import models
# from .models import Attachment

# def delete_file_if_unused(model,instance,field,instance_file_field):
#     dynamic_field = {}
#     dynamic_field[field.name] = instance_file_field.name
#     other_refs_exist = model.objects.filter(**dynamic_field).exclude(pk=instance.pk).exists()
#     if not other_refs_exist:
#         instance_file_field.delete(False)
        

# @receiver(post_delete, sender=Attachment)
# def delete_file_on_delete(sender, instance, **kwargs):
#     for field in sender._meta.concrete_fields:
#         if isinstance(field,models.FileField):
#             instance_file_field = getattr(instance,field.name)
#             delete_file_if_unused(sender,instance,field,instance_file_field)