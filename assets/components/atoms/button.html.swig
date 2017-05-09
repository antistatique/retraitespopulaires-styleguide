---
title: button
name: button
collection: atoms
variants:
  default: Button Primary
  btn-secondary: Button Secondary
  btn-default: Button Default
  btn-outline: Button Outline
changes:
  3.0.0: Improvements to CSS, the `.btn` class has to have the `.btn-primary` class to be green.
---
<button class="btn {{ variant|default('btn-primary') }}">
  {{ btn_label|default('Mon bouton') }}
</button>
