---
title: hamburger-mandat
name: hamburger-mandat
collection: atoms
notes: |
  ##### Usage : `hamburger-mandat`
  ##### Options :
  - hamburger_mandat_theme** - <i>String</i> - <b>hamburger-['primary'|'assurance'|'prevoyance'|'immobilier'|'hypotheque'|'institutionnel'|'profelia'|'cpev'|'cip']</b>
---
<div class="hamburger-mandat-wrapper hamburger-{{ hamburger_mandat_theme }}">
  <div class="hamburger-mandat-button">
    <div class="hamburger">
      <span></span>
      <span></span>
      <span></span>
    </div>
    <svg class="hamburger-circle" x="0px" y="0px" width="54px" height="54px" viewBox="0 0 54 54">
      <circle fill="transparent" stroke="#656e79" stroke-width="1.5" cx="27" cy="27" r="25" stroke-dasharray="157 157" stroke-dashoffset="157"></circle>
    </svg>
  </div>
  <div class="hamburger-mandat-helper text-secondary">
    <div class="helper-when-close">Menu</div>
    <div class="helper-when-open">Fermer</div>
  </div>
</div>
