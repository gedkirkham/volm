from django.urls import path
from .views import OrgCreateView, OrgDetailView, OrgDeleteView, OrgDraftListView, OrgUpdateView, OrgListView, org_publish

app_name = 'orgs'

urlpatterns = [
    path('', OrgListView.as_view(), name="org_list"),
    path('<int:pk>/', OrgDetailView.as_view(), name="org_detail"),
    path('new/', OrgCreateView.as_view(), name="org_new"),
    path('<int:pk>/update/', OrgUpdateView.as_view(), name="org_update"),
    path('<int:pk>/delete/', OrgDeleteView.as_view(), name="org_delete"),
    path('drafts/', OrgDraftListView.as_view(), name="org_drafts"),
    path('<int:pk>/publish/', org_publish, name="org_publish"),
]