from django.urls import path
from .views import WorkerListView, WorkerDetailView

app_name = 'workers'

urlpatterns = [
    path('', WorkerListView.as_view(), name="worker_list"),
    path('<int:pk>/', WorkerDetailView.as_view(), name="worker_detail"),
]