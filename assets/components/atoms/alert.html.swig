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
  This is a bag message.
</div>
