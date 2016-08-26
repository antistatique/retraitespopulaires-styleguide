---
title: navigations
name: navigations
collection: examples
styleguide: true
layout: examples.html.swig
---
<div class="row">
  <div class="col-xs-12 col-sm-6">
    {% include '../molecules/secondary-nav.html.swig' %}
  </div>
  <div class="col-xs-12 col-sm-6">
    {% include '../molecules/secondary-nav.html.swig' with {theme: 'assurance'} %}
  </div>
</div>
