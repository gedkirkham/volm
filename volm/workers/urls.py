from django.urls import path
from .views import WorkerListView, WorkerDetailView, WorkerUpdateView, WorkerDeleteView, WorkerCreateView

app_name = 'workers'

urlpatterns = [
    path('', WorkerListView.as_view(), name="worker_list"),
    path('<int:pk>/', WorkerDetailView.as_view(), name="worker_detail"),
    path('new/', WorkerCreateView.as_view(), name="worker_new"),
    path('<int:pk>/update/', WorkerUpdateView.as_view(), name="worker_update"),
    path('<int:pk>/delete/', WorkerDeleteView.as_view(), name="worker_delete"),
]