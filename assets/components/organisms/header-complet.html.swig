---
title: header-complet
name: header-complet
collection: organisms
notes: |
  ##### Usage : `header-complet`
  ##### Options :
  - **option** - Type
---
{% include '../molecules/menu-complet.html.swig' %}
<header class="header">
  {% include '../atoms/logo-retraitespopulaires.html.swig' %}

  <div class="row">
    <div class="col-xs-6 col-xs-offset-3 hidden-xs">
    {% include '../molecules/search-form.html.swig' %}
    </div>
  </div>

  <div class="header-nav">
    {% include '../atoms/hamburger.html.swig' %}
  </div>
</header>
