---
title: button
name: button
collection: atoms
notes: |
  ##### Usage : `button`
  ##### Options :
  - **btn_label** - <i>String</i>
  - **btn_size** - <i>String</i> - <b>btn-['lg']</b>
  - **theme** - <i>String</i> - <b>btn-['outline'|'primary'|'assurance'|'prevoyance'|'immobilier'|'hypotheque'|'institutionnel'|'profelia'|'cpev'|'cip']</b>
---
<button class="btn btn-{{ btn-size }} btn-{{ theme }}">
  {{ btn_label|default('Mon bouton') }}
</button>
