---
title: tables
name: tables
collection: examples
styleguide: true
layout: examples.html.swig
---
<div class="row">
  <div class="col-xs-12">
    <h6>Table Wide</h6>
    {% include '../molecules/table.html.swig' with {size: 'wide'} %}
  </div>
</div>
<div class="spacer"></div>
<div class="row">
  <div class="col-xs-12">
    <h6>Table Condensed</h6>
    {% include '../molecules/table.html.swig' with {size: 'condensed'} %}
  </div>
</div>
<div class="spacer"></div>
<div class="row">
  <div class="col-xs-12">
    <h6>Table Wide - Themed</h6>
    {% include '../molecules/table.html.swig' with {size: 'wide', theme: 'assurance'} %}
  </div>
</div>
<div class="spacer"></div>
<div class="row">
  <div class="col-xs-12">
    <h6>Table Condensed - Themed</h6>
    {% include '../molecules/table.html.swig' with {size: 'condensed', theme: 'assurance'} %}
  </div>
</div>
