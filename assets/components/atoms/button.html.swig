---
title: button
name: button
collection: atoms
changes:
  3.0.0: Improvements to CSS, the `.btn` class has to have the `.btn-primary` class to be green.
---
<button class="btn btn-primary">
  {{ btn_label|default('Mon bouton') }}
</button>
