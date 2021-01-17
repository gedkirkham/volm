from django import forms
from .models import Org
from django.utils.translation import gettext_lazy as _

class OrgForm(forms.ModelForm):

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self.fields['active'].widget.attrs.update({ 'class': 'tw-shadow tw-border tw-block' })
        # self.fields['banner_image'].widget.attrs.update({ 'class': 'tw-block' })
        self.fields['charity_id'].widget.attrs.update({ 'class': 'tw_input' })
        self.fields['tag_line'].widget.attrs.update({ 'class': 'tw_input' })
        self.fields['name'].widget.attrs.update({ 'class': 'tw_input' })

    class Meta():
        model = Org
        fields = ['active', 'charity_id', 'long_bio', 'members', 'name', 'short_bio', 'tags', 'tag_line']

        help_texts = {
            'active': _('If the charity is active, it is visible to the public'),
            # 'banner_image': _('Must be 250px x 700px'),
            'charity_id': _('The registered charity ID'),
            # 'logo': _('Must be 250px x 250px'),
            'long_bio': _('Displayed on the charities details page'),
            'name': _('The charities name'),
            'members': _('Select the working members of the charity'),
            'short_bio': _('Displayed in the pages listing'),
            'tags': _('Words to identify the charity'),
            'tag_line': _('A catchy tag line that will is displayed under the charities name'),
        }

        widgets = {
            'short_bio': forms.Textarea(attrs={'class': 'tw_input'}),
            'long_bio': forms.Textarea(attrs={'class': 'tw_input'}),
        }
