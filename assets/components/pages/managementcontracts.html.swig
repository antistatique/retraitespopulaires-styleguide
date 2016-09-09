---
title: managementcontracts
name: managementcontracts
collection: pages
styleguide: false
layout: page.html.swig
---
{% include '../organisms/header.html.swig' %}
{% include '../atoms/funky-waves.html.swig' %}

<div class="container">
  <div class="row"></div>
    <div class="col-xs-9 col-xs-offset-3 text-center">
      {% include '../molecules/breadcrumb.html.swig' %}
      <div class="spacer"></div>
    </div>
  </div>
</div>

<div class="container">
  <div class="row">
    <div class="col-xs-12 col-md-9 col-md-push-3">
      <h1 class="page-title text-center">CPEV</h1>
      <div class="spacer"></div>
    </div>
    <div class="col-xs-12 col-md-3 col-md-pull-9">
      <div class="spacer spacer-xl visible-xs visible-sm"></div>
      {% include '../molecules/secondary-nav.html.swig' with {'theme': 'prevoyance'} %}
    </div>
  </div>
</div>
<div class="spacer spacer-xl"></div>
{% include '../organisms/footer.html.swig' %}
