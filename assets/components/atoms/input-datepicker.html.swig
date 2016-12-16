---
title: input-datepicker
name: input-datepicker
collection: atoms
notes: |
  ##### Usage : `input-datepicker`
  - **datepicker_theme** - <i>String</i> - <b>datepicker-['outline'|'primary'|'assurance'|'prevoyance'|'immobilier'|'hypotheque'|'institutionnel'|'profelia'|'cpev'|'cip']</b>
---
<div class="form-group">
  <label>label</label>
  <div class="input-group">
    <input type="text" class="form-control form-control-{{datepicker_theme}}  datepicker" aria-label="Saisissez la date au format (JJ/MM/AAAA)" value="02/12/2016">
    <span class="input-group-btn">
      <button class="btn btn-{{datepicker_theme}} btn-icon" type="button" aria-label="Choisir la date"><i class="retraitespopulaires-icon retraitespopulaires-icon-calendar"></i></button>
    </span>
  </div>
</div>
