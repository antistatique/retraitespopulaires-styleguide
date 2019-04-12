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

  Multiple data options can be set:
    - data-value: Default value
    - data-step: Number of step to move slider
    - data-max: Max number of the slider
    - data-min: Min number of the slider
    - data-range: To change type of jQuery.ui slider range (min (default), max, null)
    - data-labels: Key-Value object of labels to show
      - Key: To which value the label must be placed
      - Value: The label to show
      - The declaration must be compatible with `JSON.parse()` [See and try it](https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Objets_globaux/JSON/parse)
    - data-show-pips: To show pips for non labeled steps (default: false)

variants:
  default: Default
  disable: Disabled
  vertical: Vertical
  labels: Labels
---
{% if (variant|default('default')) == 'default' %}
<div class="slider" data-value="50" data-step="1" data-max="100" data-min="0" ></div>
{% elseif variant == 'disable' %}
<div class="slider disabled" data-value="50" data-step="1" data-max="100" data-min="0"></div>
{% elseif variant == 'vertical' %}
<div class="slider slider-vertical" data-value="50" data-step="1" data-max="100" data-min="0" style="height: 200px"></div>
{% elseif variant == 'labels' %}
<div class="slider" data-value="1" data-step="1" data-max="6" data-min="0" data-range="null" data-labels='{"0":"Bad","3":"Good","6":"Very Good"}' data-show-pips="true"></div>
{% endif %}
