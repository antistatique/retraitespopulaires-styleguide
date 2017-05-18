---
title: Fieldset
name: fieldset
collection: molecules
variants:
  fieldset-bordered: Bordered
notes: |
  Can be used with the modifier `fieldset-bordered` to add border left. <br>
---
<form>
  <h3>Vos données personnelles</h3>
  <fieldset class="{% if variant %}{{ variant}}{% endif %}">
    {% include '../atoms/input-text.html.swig' %}
    {% include '../atoms/input-datepicker.html.swig' %}
    {% include '../atoms/input-radio-btn.html.swig' %}
  </fieldset>
</form>
