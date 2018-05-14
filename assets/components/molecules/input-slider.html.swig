---
title: Input Slider
name: input-slider
collection: molecules
notes: |
  The slider div must be in the same `<div class="form-group"></div>` that the input

  Needs `jQuery.ui.slider` for working and `jQuery.ui.touch-punch` for mobile support.
---
<form>
    <div class="form-group">
        <label>Revenu annuel</label>
        <input class="form-chf-numeric text-right form-text form-control" type="text" value="3000" maxlength="128" placeholder="CHF">
        <br>
        <div class="slider" data-step="5000" data-max="300000" data-min="0"></div>
    </div>
</form>