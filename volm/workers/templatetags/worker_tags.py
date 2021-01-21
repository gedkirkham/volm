from django import template

register = template.Library()

@register.filter(name='get_verbose_name')
def get_verbose_name(object, field):
    return object._meta.get_field(field).verbose_name.title()
    