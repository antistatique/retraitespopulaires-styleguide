---
title: organic-lines
name: organic-lines
collection: atoms
notes: |
  ##### Usage : `organic-lines`
  ##### Options :
  - **organic_lines_theme** - <i>String</i> - <b>lines-['assurance'|'prevoyance'|'immobilier'|'hypotheque'|'institutionnel'|'profelia'|'cpev'|'cip']</b>
---
<div class="organic-lines lines-{{ organic_lines_theme|default('primary') }}"></div>
