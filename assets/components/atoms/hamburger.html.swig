---
title: hamburger
name: hamburger
collection: atoms
notes: |
  ##### Usage : `hamburger`
  ##### Options :
  - **hamburger_link** - <i>Boolean</i>
  - hamburger_theme** - <i>String</i> - <b>hamburger-['primary'|'assurance'|'prevoyance'|'immobilier'|'hypotheque'|'institutionnel'|'profelia'|'cpev'|'cip']</b>
---
{% if hamburger_link %}
  <a href="#" class="hamburger-wrapper hamburger-{{ hamburger_theme }}">
{% else %}
  <div class="hamburger-wrapper hamburger-{{ hamburger_theme }}">
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
{% if hamburger_link %}
  </a>
{% else %}
  </div>
{% endif %}
