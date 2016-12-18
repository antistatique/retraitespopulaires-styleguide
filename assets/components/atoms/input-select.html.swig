---
title: input-select
name: input-select
collection: atoms
notes: |
  ##### Usage : `input-select`
  - **input_select_theme** - <i>String</i> - <b>hamburger-['outline'|'primary'|'assurance'|'prevoyance'|'immobilier'|'hypotheque'|'institutionnel'|'profelia'|'cpev'|'cip']</b>
---
<div class="form-group">
  <label for="inputID">Label</label>
  <select class="form-control form-control-{{input_select_theme}}">
    <option>Choisir, c'est renoncer...</option>
    <option>The second option</option>
    <option>The third option</option>
  </select>
  </div>
