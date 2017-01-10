---
title: input-textarea
name: input-textarea
collection: atoms
notes: |
  ##### Usage : `input-textarea`
  - **input_textarea_theme** - <i>String</i> - <b>datepicker-['primary'|'assurance'|'prevoyance'|'immobilier'|'hypotheque'|'institutionnel'|'profelia'|'cpev'|'cip']</b>
---
<div class="form-group">
  <label for="inputID">Label</label>
  <textarea name="name" class="form-control form-control-{{input_textarea_theme}}" rows="8" placeholder="Soyez le plus précis possible, merci."></textarea>
</div>
