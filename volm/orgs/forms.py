from django import forms
from .models import Org

class OrgForm(forms.ModelForm):
    error_css_class = 'tw-bg-red-500'
    required_css_class = 'tw-bg-yellow-500'

    class Meta():
        model = Org
        fields = ('charity_id', 'short_bio', 'long_bio', 'tag_line', 'name')
        widgets = {
            'charity_id': forms.TextInput(attrs={'class': 'tw-shadow tw-appearance-none tw-border tw-rounded tw-w-full tw-py-2 tw-px-3 tw-text-gray-700 tw-mb-3 tw-leading-tight focus:tw-outline-none focus:tw-shadow-outline'}),
            'short_bio': forms.TextInput(attrs={'class': 'tw-shadow tw-appearance-none tw-border tw-rounded tw-w-full tw-py-2 tw-px-3 tw-text-gray-700 tw-mb-3 tw-leading-tight focus:tw-outline-none focus:tw-shadow-outline'}),
            'long_bio': forms.TextInput(attrs={'class': 'tw-shadow tw-appearance-none tw-border tw-rounded tw-w-full tw-py-2 tw-px-3 tw-text-gray-700 tw-mb-3 tw-leading-tight focus:tw-outline-none focus:tw-shadow-outline'}),
            'tag_line': forms.TextInput(attrs={'class': 'tw-shadow tw-appearance-none tw-border tw-rounded tw-w-full tw-py-2 tw-px-3 tw-text-gray-700 tw-mb-3 tw-leading-tight focus:tw-outline-none focus:tw-shadow-outline'}),
            'name': forms.TextInput(attrs={'class': 'tw-shadow tw-appearance-none tw-border tw-rounded tw-w-full tw-py-2 tw-px-3 tw-text-gray-700 tw-mb-3 tw-leading-tight focus:tw-outline-none focus:tw-shadow-outline'}),
        }
        
