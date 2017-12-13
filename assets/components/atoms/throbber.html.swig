---
title: Throbber
name: throbber
collection: atoms
variants:
  primary: Primary
notes: |
  Drupal `ajax.js` places the following after the element that has triggered a loading action!
---
<div class="ajax-progress ajax-progress-throbber">
  <div class="throbber-retraitespopulaires {% if variant == 'primary' %}throbber-primary{% endif %}">&nbsp;</div>
</div>
