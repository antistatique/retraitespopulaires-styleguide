---
title: loader
name: loader
collection: atoms
notes: |
  ##### Usage : `loader`
  ##### Options :
  - **loader_type** - <i>String</i> - <b>loader-['snake'|'yinyang']</b>
  - **loader_theme** - <i>String</i> - <b>loader-['assurance'|'prevoyance'|'immobilier'|'hypotheque'|'institutionnel'|'profelia'|'cpev'|'cip']</b>
---
{% if not loader_type %} {% set loader_type = 'snake' %} {% endif %}
<div class="loader">
  <div class="loader-{{ loader_type }} loader-{{ loader_theme }}"></div>
</div>
