from django.contrib import admin

from .models import Day, Timezone, Time

admin.site.register(Day)
admin.site.register(Timezone)
admin.site.register(Time)
