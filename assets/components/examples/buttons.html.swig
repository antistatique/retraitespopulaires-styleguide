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
    <button class="btn btn-invisible btn-collapse btn-xs collapsed" data-toggle="collapse" data-target="#collapse" aria-expanded="true">
      <span class="caret" aria-hidden="true"></span>
      <span class="retraitespopulaires-icon retraitespopulaires-icon-3x retraitespopulaires-icon-document-file text-primary"></span>
    </button>
    <div id="collapse" class="collapse">
      Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
    </div>
    <div class="spacer spacer-xs"></div>
  </div>
</div>
