---
title: fieldset
name: fieldset
collection: molecules
notes: |
  ##### Usage : `fieldset`
---
<form>
  <h1>Vos données personnelles</h1>
  <fieldset class="fieldset-bordered">
    {% include '../atoms/input-text.html.swig' %}
    {% include '../atoms/input-datepicker.html.swig' %}
    {% include '../atoms/input-radio-btn.html.swig' %}
  </fieldset>
</form>
