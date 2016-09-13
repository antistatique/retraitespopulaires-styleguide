---
title: tables
name: tables
collection: examples
styleguide: true
layout: examples.html.swig
---
<div class="row">
  <div class="col-xs-12">
    <h6>Tableau long</h6>
    {% include '../molecules/table.html.swig' with {size: 'wide'} %}
  </div>
</div>
<div class="spacer"></div>
<div class="row">
  <div class="col-xs-12">
    <h6>Tableau condenser</h6>
    {% include '../molecules/table.html.swig' with {size: 'condensed'} %}
  </div>
</div>
<div class="spacer"></div>
<div class="row">
  <div class="col-xs-12">
    <h6>Tableau long - Thème</h6>
    {% include '../molecules/table.html.swig' with {size: 'wide', theme: 'assurance'} %}
  </div>
</div>
<div class="spacer"></div>
<div class="row">
  <div class="col-xs-12">
    <h6>Tableau condenser - Thème</h6>
    {% include '../molecules/table.html.swig' with {size: 'condensed', theme: 'assurance'} %}
  </div>
</div>
