---
title: buttons
name: buttons
collection: examples
styleguide: true
layout: examples.html.swig
---
<div class="row">
  <div class="col-xs-12 col-sm-6">
    {% include '../atoms/button.html.swig' with {'btn_label': 'Bouton principal'} %}
    <div class="spacer spacer-xs"></div>
    {% include '../atoms/button.html.swig' with {'btn_label': 'Assurance vie', 'btn_theme': 'assurance'} %}
    <div class="spacer spacer-xs"></div>
    {% include '../atoms/button.html.swig' with {'btn_label': 'Bouton contour', 'btn_theme': 'outline'} %}
    <div class="spacer spacer-xs"></div>
  </div>
</div>
