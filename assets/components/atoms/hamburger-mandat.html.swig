---
title: hamburger-mandat
name: hamburger-mandat
collection: atoms
notes: |
  ##### Usage : `hamburger-mandat`
  ##### Options :
  - **hamburger_mandat_link** - <i>Boolean</i>
---
{% if hamburger_mandat_link %}
  <a href="#" class="hamburger-mandat-wrapper">
{% else %}
  <div class="hamburger-mandat-wrapper">
{% endif %}
  <div class="hamburger-mandat-button">
    <div class="hamburger-mandat">
      <span></span>
      <span></span>
      <span></span>
    </div>
    <svg class="hamburger-mandat-circle" x="0px" y="0px" width="54px" height="54px" viewBox="0 0 54 54">
      <circle fill="transparent" stroke="#656e79" stroke-width="1.5" cx="27" cy="27" r="25" stroke-dasharray="157 157" stroke-dashoffset="157"></circle>
    </svg>
  </div>
  <div class="hamburger-mandat-helper">
    <div class="helper-when-close">Menu</div>
    <div class="helper-when-open">Fermer</div>
  </div>
{% if hamburger_mandat_link %}
  </a>
{% else %}
  </div>
{% endif %}
