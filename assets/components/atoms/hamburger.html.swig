---
title: hamburger
name: hamburger
collection: atoms
notes: |
  ##### Usage : `hamburger`
  ##### Options :
  - **link** - Boolean
---
{% if link %}
  <a href="/retraitespopulaires-styleguide" class="hamburger-wrapper">
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
      <circle fill="transparent" stroke="#656e79" stroke-width="1" cx="27" cy="27" r="25" stroke-dasharray="157 157" stroke-dashoffset="157"></circle>
    </svg>
  </div>
  <div class="hamburger-helper text-cocon">
    <div class="helper-when-close">Menu</div>
    <div class="helper-when-open">Fermer</div>
  </div>
{% if link %}
  </a>
{% else %}
  </div>
{% endif %}
