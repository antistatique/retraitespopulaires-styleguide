---
title: search-box
name: search-box
collection: atoms
notes: |
  ##### Usage : `search-box`
  ##### Options :
  - **search_box_theme** - <i>String</i> - <b>navbar-['assurance'|'prevoyance'|'immobilier'|'hypotheque'|'institutionnel'|'profelia'|'cpev'|'cip']</b>
---
<div class="search-box search-box-{{ search_box_theme|default('primary') }}">
  <a href="#" class="search-toggle">
    <i aria-hidden="true" class="retraitespopulaires-icon retraitespopulaires-icon-search"></i>
    <div class="sr-only">Recherche</div>
  </a>
</div>
