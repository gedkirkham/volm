from django.contrib import admin

from .models import AvailabilityDetail, AvailabilityBasic, Experience, Worker, WorkerTags

admin.site.register(AvailabilityDetail)
admin.site.register(AvailabilityBasic)
admin.site.register(Experience)
admin.site.register(Worker)
admin.site.register(WorkerTags)
