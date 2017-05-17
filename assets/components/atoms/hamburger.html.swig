---
title: Hamburger
name: hamburger
collection: atoms
variants:
  link-only: Hamburger as Link
notes: |
  Can be wrapped in `.theme-[theme]` to change look.

---
{% if variant == 'link-only' -%}
  <a href="//www.retraitespopulaires.ch/launcher" class="hamburger-wrapper d-block">
{% else %}
  <div class="hamburger-wrapper">
{% endif %}
  <div class="hamburger-button">
    <div class="hamburger">
      <span></span>
      <span></span>
      <span></span>
    </div>
    <svg class="hamburger-circle" x="0px" y="0px" width="54px" height="54px" viewBox="0 0 54 54">
      <circle fill="transparent" stroke="#656e79" stroke-width="1.5" cx="27" cy="27" r="25" stroke-dasharray="157 157" stroke-dashoffset="157"></circle>
    </svg>
  </div>
  <div class="hamburger-helper text-secondary">
    <div class="helper-when-close">Menu</div>
    <div class="helper-when-open">Fermer</div>
  </div>
{% if variant == 'link-only' -%}
  </a>
{% else %}
  </div>
{% endif %}
