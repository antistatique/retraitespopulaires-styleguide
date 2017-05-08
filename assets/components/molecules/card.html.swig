---
title: Card
name: card
variants:
  test: super
collection: molecules
notes: |
---
<div class="card">
  {% if variant == 'test' %}
      variante!
  {% endif %}
  this will be the base card
</div>
