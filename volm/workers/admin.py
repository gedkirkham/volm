from django.contrib import admin

from .models import Availability, Worker, WorkerTags

admin.site.register(Availability)
admin.site.register(Worker)
admin.site.register(WorkerTags)
