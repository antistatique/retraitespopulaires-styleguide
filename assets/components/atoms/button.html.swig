---
title: button
name: button
collection: atoms
notes: |
  ##### Usage : `button`
  ##### Options :
  - **btn_label** - String
  - **btn_size** - String ['lg']
  - **theme** - String ['outline'|'primary'|'assurance'|'prevoyance'|'immobilier'|'hypotheque'|'institutionnel'|'profelia'|'cpev'|'cip']
---
<button class="btn btn-{{ btn-size }} btn-{{ theme }}">
  {{ btn_label|default('Mon bouton') }}
</button>
