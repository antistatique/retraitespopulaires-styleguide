---
title: Tooltip
name: tooltip
collection: atoms
bootstrap: https://getbootstrap.com/javascript/#popovers
notes: |
  Add `tooltip-shift` to make the tooltip shift to the right

variants:
  default: Default
  green: Green
---
<div class="tooltip tooltip-info">
  <div class="tooltip-symbol {% if variant == 'green' %}tooltip-symbol-green{% endif %}" aria-label="Sample text" title="Popover title" data-content="And here's some amazing content. It's very engaging. Right?" data-placement="right" tabindex="0" data-toggle="popover"></div>
</div>
