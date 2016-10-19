---
title: header
name: header
collection: organisms
notes: |
  ##### Usage : `header`
  ##### Options :
  - **light** - Boolean
  - **theme** - Theme
---
{% if not light %}
  {% include '../molecules/big-menu.html.swig' %}
{% endif %}
<header class="header">
  {% include '../atoms/logo-retraitespopulaires.html.swig' %}

  {% if not light %}
  <div class="row">
    <div class="col-xs-6 col-xs-offset-3 hidden-xs">
    {% include '../molecules/search-form.html.swig' %}
    </div>
  </div>
  {% endif %}
  <div class="header-nav">
    {% include '../atoms/hamburger.html.swig' with {'link': light, 'theme': theme} %}
  </div>
</header>
