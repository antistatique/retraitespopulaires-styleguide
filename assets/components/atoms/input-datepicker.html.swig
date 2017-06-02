---
title: Input Datepicker
name: input-datepicker
collection: atoms
variants:
  input-group: With Button
notes: |
  Can be wrapped in `.theme-[theme]` to change look. <br>
  We use the `jQuery` plugin [bootstrap-datepicker](https://bootstrap-datepicker.readthedocs.io/en/latest), check the documentation for advanced usage & parameters.
---
<div class="form-group">
  <label for="dateinput" >label</label>
  <div class="input-group">
    <input id="dateinput" size="15" class="datepicker form-text form-control" type="text" value="02/12/2016" maxlength="10" placeholder="jj/mm/aaaa">
    {%- if variant == 'input-group' %}
    <span class="input-group-btn">
      <button class="btn btn-primary" type="button"><span class="retraitespopulaires-icon retraitespopulaires-icon-lg retraitespopulaires-icon-calendar" aria-hidden="true"></span></button>
    </span>
    {%- else %}
    <span class="input-group-btn no-events" aria-hidden="true">
      <div class="btn btn-invert btn-icon">
        <span class="retraitespopulaires-icon retraitespopulaires-icon-calendar"></span>
      </div>
    </span>
    {%- endif %}
  </div>
</div>
