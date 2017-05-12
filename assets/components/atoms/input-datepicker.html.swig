---
title: input-datepicker
name: input-datepicker
collection: atoms
notes: |
  Can be wrapped in `.theme-[theme]` to change look. <br>
  We use the `jQuery` plugin [bootstrap-datepicker](https://bootstrap-datepicker.readthedocs.io/en/latest), check the documentation for advanced usage & parameters.
---
<div class="form-group">
  <label for="dateinput" >label</label>
  <div class="input-group">
    <input id="dateinput" size="15" class="datepicker form-text form-control" type="text" value="02/12/2016" maxlength="10" placeholder="jj/mm/aaaa">
    <span class="input-group-btn no-events">
      <div class="btn btn-invert btn-icon">
        <span class="retraitespopulaires-icon retraitespopulaires-icon-calendar"></span>
      </div>
    </span>
  </div>
</div>
