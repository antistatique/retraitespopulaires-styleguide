---
title: button
name: button
collection: atoms
notes: |
  ##### Usage : `button`
---
<button class="btn btn-lg btn-primary">
  {% spaceless %}
    {% if label %}
      {{label}}
    {% else %}
      Mon bouton
    {% endif %}
  {% endspaceless %}
</button>
