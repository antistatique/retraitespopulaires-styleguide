---
title: alert
name: alert
collection: atoms
notes: |
  ##### Usage : `alert`
  ##### Options :
  - **type** - String
---
{% if not type %}
  {% set type = 'info' %}
{% endif %}

<div class="alert alert-{{type}}">
  <a href="#" class="close" data-dismiss="alert" aria-label="close">&times;</a>
  <strong>Info!</strong> Indique un changement ou une action d'information neutre.
</div>
