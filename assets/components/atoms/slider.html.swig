---
title: Slider
name: slider
collection: atoms
notes: |
  Needs `jQuery.ui.slider` for working and `jQuery.ui.touch-punch` for mobile support.

  This code is the only needed, the rest is injected by `jQuery.ui`:<br>
  ```html
  <div class="slider" data-step="1" data-max="100" data-min="0"></div>
  ```

variants:
  default: Default
  disable: Disabled
  vertical: Vertical
---
{% if (variant|default('default')) == 'default' %}
<div class="slider" data-value="50" data-step="1" data-max="100" data-min="0" ></div>
{% elseif variant == 'disable' %}
<div class="slider disabled" data-value="50" data-step="1" data-max="100" data-min="0" ></div>
{% elseif variant == 'vertical' %}
<div class="slider slider-vertical" data-value="50" data-step="1" data-max="100" data-min="0" style="height: 200px" ></div>
{% endif %}