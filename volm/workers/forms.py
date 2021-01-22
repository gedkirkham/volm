from django import forms
from django.utils.translation import gettext_lazy as _
from django.forms import modelformset_factory

from .models import AvailabilityDetail, AvailabilityBasic, Worker

class AvailabilityForm(forms.ModelForm):
    
    class Meta():
        model = AvailabilityDetail
        fields = ['day', 'time_from', 'time_to', 'timezone']

    def __init__(self, *arg, **kwarg):
        super(AvailabilityForm, self).__init__(*arg, **kwarg)
        self.empty_permitted = False

initial=[
    {
        'day': [1],
        'time_from': [1],
        'time_to': [1],
        'timezone': [1],
    },
    {
        'day': [2],
        'time_from': [1],
        'time_to': [1],
        'timezone': [1],
    },
    {
        'day': [3],
        'time_from': [1],
        'time_to': [1],
        'timezone': [1],
    },
    {
        'day': [4],
        'time_from': [1],
        'time_to': [1],
        'timezone': [1],
    },
    {
        'day': [5],
        'time_from': [1],
        'time_to': [1],
        'timezone': [1],
    },
    {
        'day': [6],
        'time_from': [1],
        'time_to': [1],
        'timezone': [1],
    },
    {
        'day': [7],
        'time_from': [1],
        'time_to': [1],
        'timezone': [1],
    },
]
AvailabilityFormSet = modelformset_factory(AvailabilityDetail, form=AvailabilityForm, extra=7, max_num=7, validate_max=True, fields=('day', 'time_from', 'time_to', 'timezone'))

class WorkerForm(forms.ModelForm):

    class Meta():
        model = Worker
        fields = ['title', 'main_skill', 'tags', 'description', 'remote_only']

        help_texts = {
            'active': _('If you are active, you are visible to the public'),
            'description': _('Describe yourself in detail. Let people know what you can offer'),
            'main_skill': _('What skill best describes you?'),
            'remote_only': _('Can you only work remotely for this work?'),
            'tags': _('Select other skills that are relevant to yourself'),
            'title': _('Make it something short and snappy'),
        }

class AvailabilityBasicForm(forms.ModelForm):
    
    class Meta():
        model = AvailabilityBasic
        fields = ["hours", "type"]
