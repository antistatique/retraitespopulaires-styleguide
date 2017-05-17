---
title: Button
name: button
collection: atoms
bootstrap: https://getbootstrap.com/css/#buttons
variants:
  default: Button Primary
  btn-secondary: Button Secondary
  btn-default: Button Default
  btn-outline: Button Outline
  btn-circle: Button Circle
changes:
  3.0.0: Improvements to CSS, the `.btn` class has to have the `.btn-primary` class to be green.
notes: |
  Can be wrapped in `.theme-[theme]` to change look
---
{% if variant != 'btn-circle' -%}
<button class="btn {{ variant|default('btn-primary') }}">
  {{ btn_label|default('Mon bouton') }}
</button>
{%- else -%}
<button class="btn btn-circle btn-outline" aria-label="Next">
  <span class="retraitespopulaires-icon retraitespopulaires-icon-arrow-thin" aria-hidden="true"></span>
</button>
{%- endif -%}
