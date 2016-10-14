---
title: loaders
name: loaders
collection: examples
styleguide: true
layout: examples.html.swig
---
<div class="row">
  <div class="col-xs-10 col-xs-offset-1 col-sm-3 col-sm-offset-3">
    {% include '../atoms/loader.html.swig' with  %}
    <div class="spacer"></div>
    {% include '../atoms/loader.html.swig' with {'loader_type': 'yingyang'} %}
  </div>
  <div class="col-xs-10 col-xs-offset-1 col-sm-3">
    <div class="spacer visible-xs"></div>
    {% include '../atoms/loader.html.swig' with {'loader_theme': 'assurance'} %}
    <div class="spacer"></div>
    {% include '../atoms/loader.html.swig' with {'loader_type': 'yingyang', 'loader_theme': 'assurance'} %}
  </div>
</div>
