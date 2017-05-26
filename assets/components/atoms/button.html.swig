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
  btn-icon: Button Icon
changes:
  3.0.0: Improvements to CSS, the `.btn` class has to have the `.btn-primary` class to be green. `.btn-circle` replaces the `.arrow` component
  3.1.0: The `btn-outline` must have the `btn-primary` class to work correctly
notes: |
  Can be wrapped in `.theme-[theme]` to change look
---
{% if variant != 'btn-circle' and variant != 'btn-icon' -%}
<button class="btn {{ variant|default('btn-primary') }}{% if variant == 'btn-icon' %} btn-icon{% endif %}{% if variant == 'btn-outline' %} btn-primary{% endif %}">
  {{ btn_label|default('Mon bouton') }}
</button>
{%- elseif variant != 'btn-icon' -%}
<button class="btn btn-circle btn-outline" aria-label="Next">
  <span class="retraitespopulaires-icon retraitespopulaires-icon-arrow-thin" aria-hidden="true"></span>
</button>
{%- else -%}
<button class="btn btn-primary btn-icon">
  <i aria-hidden="true" class="retraitespopulaires-icon retraitespopulaires-icon-search"></i>
</button>
{%- endif -%}
