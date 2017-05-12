---
title: input-radio
name: input-radio
notes: |
  Can be wrapped in `.theme-[theme]` to change look.
collection: atoms
---
<div class="form-group">
  <div class="input-radio">
    <input aria-label="Parfum pistache" type="radio" name="taste" id="taste-pistache" value="pistache" checked>
    <label class="option" for="taste-pistache">Pistache</label>
  </div>
  <div class="input-radio">
    <input aria-label="Parfum menthe fraîche" type="radio" name="taste" id="taste-menth" value="menth-fraiche">
    <label class="option" for="taste-menth">Menthe fraîche</label>
  </div>
  <div class="input-radio">
    <input aria-label="Parfum chocolat" type="radio" name="taste" id="taste-chocolat" value="chocolat" checked="checked" />
    <label class="option" for="taste-chocolat">Chocolat</label>
  </div>
</div>
