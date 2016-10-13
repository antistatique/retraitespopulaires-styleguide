---
title: button
name: button
collection: atoms
notes: |
  ##### Usage : `button`
  ##### Options :
  - **theme** - String
  - **btn_label** - String
---
<button class="btn btn-lg btn-{{ theme }}">
  {% spaceless %}
    {% if btn_label %}
      {{ btn_label }}
    {% else %}
      Mon bouton
    {% endif %}
  {% endspaceless %}
</button>
