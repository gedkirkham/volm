from django import forms
from .models import Org

class OrgForm(forms.ModelForm):
    class Meta():
        model = Org
        fields = ('charity_id', 'short_bio', 'long_bio', 'tag_line', 'name')
