---
title: button-bubble
name: button-bubble
collection: atoms
notes: |
  ##### Usage : `button-bubble`
  - **bubble_theme** - <i>String</i> - <b>button-bubble-['outline'|'primary'|'assurance'|'prevoyance'|'immobilier'|'hypotheque'|'institutionnel'|'profelia'|'cpev'|'cip']</b>
---
<div class="button-bubble button-bubble-{{bubble_theme}} text-center">
  <div class="spacer spacer-xs"></div>
  <div class="bubble-icon">
    <a aria-label="Lien" href="#"><i class="retraitespopulaires-icon retraitespopulaires-icon-2x retraitespopulaires-icon-lock"></i></a>
  </div>
  <div class="bubble-link">
    <a href="#" class="pretty-link text-{{bubble_theme}}">Lien</a>
  </div>
</div>
