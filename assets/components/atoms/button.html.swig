---
title: button
name: button
collection: atoms
notes: |
  ##### Usage : `button`
  ##### Options :
  - **theme** - String
---
<button class="btn btn-lg btn-{{ theme }}">
  {% spaceless %}
    {% if label %}
      {{label}}
    {% else %}
      Mon bouton
    {% endif %}
  {% endspaceless %}
</button>
