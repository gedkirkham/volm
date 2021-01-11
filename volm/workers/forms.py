from django import forms
from django.utils.translation import gettext_lazy as _
from django.forms import modelformset_factory

from .models import Availability, Worker

class AvailabilityForm(forms.ModelForm):
    
    class Meta():
        model = Availability
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
AvailabilityFormSet = modelformset_factory(Availability, form=AvailabilityForm, extra=7, max_num=7, validate_max=True, fields=('day', 'time_from', 'time_to', 'timezone'))

class WorkerForm(forms.ModelForm):

    class Meta():
        model = Worker
        fields = ['title', 'short_bio', 'long_bio']

        help_texts = {
            'active': _('If you are active, you are visible to the public'),
            'title': _('Give your advert a catchy title'),
            'short_bio': _('Optional: Will be displayed in the advert listings'),
            'long_bio': _('Describe yourself in detail. Let people know what you can offer'),
            'tags': _('Select tags that are relevant to yourself'),
        }