from django import forms
from .models import Worker
from django.utils.translation import gettext_lazy as _

class WorkerForm(forms.ModelForm):

    class Meta():
        model = Worker
        fields = ['active', 'address', 'contact', 'orgs', 'user']

        help_texts = {
            'active': _('If you are active, you are visible to the public'),
        }
