---
title: Header
name: header
collection: organisms
notes: |
  ##### Usage : `header`
  ##### Options :
  - **light** - <i>Boolean</i>
  - **theme** - <i>String</i> - <b>['assurance'|'prevoyance'|'immobilier'|'hypotheque'|'institutionnel'|'profelia'|'cpev'|'cip']</b>
---
{% if not light %}
  {% include '../molecules/big-menu.html.swig' %}
{% endif %}
<header class="header">
  <div class="logo-retraitespopulaires svg-responsive">
    <a href="#"><img src="{{data.path}}build/svg/logo-retraitespopulaires.svg" alt="Retraites Populaires" aria-label="Retraites Populaires"></a>
  </div>

  {% if not light %}
  <div class="row">
    <div class="col-xs-6 col-xs-offset-3 hidden-xs">
    {% include '../molecules/search-form.html.swig' %}
    </div>
  </div>
  {% endif %}
  <div class="header-nav" aria-hidden="true">
    {% include '../atoms/hamburger.html.swig' with {'hamburger_link': light, 'hamburger_theme': theme} %}
  </div>
</header>
