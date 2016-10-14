---
title: loader
name: loader
collection: atoms
notes: |
  ##### Usage : `loader`
  ##### Options :
  - **loader_type** - String
  - **loader_theme** - String
---
{% if not loader_type %} {% set loader_type = 'snake' %} {% endif %}
<div class="loader">
  <div class="loader-{{ loader_type }} loader-{{ loader_theme }}"></div>
</div>
