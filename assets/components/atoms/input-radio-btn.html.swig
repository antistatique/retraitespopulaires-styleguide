---
title: input-radio-btn
name: input-radio-btn
collection: atoms
notes: |
  ##### Usage : `input-radio-btn`
  - **input_radio_btn_theme** - <i>String</i> - <b>text-['outline'|'primary'|'assurance'|'prevoyance'|'immobilier'|'hypotheque'|'institutionnel'|'profelia'|'cpev'|'cip']</b>
---
<div class="form-group">
  <div class="input-radio-btn">
    <div class="btn-group" data-toggle="buttons">
      <label class="btn  btn-{{input_radio_btn_theme}} active">
        <input type="radio" name="options" id="caramel_beurre-sale" aria-label="Parfum caramel beurre salé" autocomplete="off" checked> Caramel beurre salé
      </label>
      <label class="btn btn-{{input_radio_btn_theme}} ">
        <input type="radio" name="options" id="stracciatella" aria-label="Parfum stracciatella" autocomplete="off"> Stracciatella
      </label>
      <label class="btn btn-{{input_radio_btn_theme}} ">
        <input type="radio" name="options" id="framboise" aria-label="Parfum framboise" autocomplete="off"> Framboise
      </label>
    </div>
    <div class="input-radio-btn-unit"> parfums</div>
  </div>
</div>
