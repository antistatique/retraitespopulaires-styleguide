---
title: input-text
name: input-text
collection: atoms
notes: |
  ##### Usage : `input-text`
  ##### Options :
  - **theme** - <i>String</i> - <b>form-control-['assurance'|'prevoyance'|'immobilier'|'hypotheque'|'institutionnel'|'profelia'|'cpev'|'cip']</b>
---
<div class="form-group">
  <label for="inputID">Label</label>
  <input class="form-control form-control-{{ theme }}" id="inputID" type="text" placeholder="Placeholder"></input>
</div>
