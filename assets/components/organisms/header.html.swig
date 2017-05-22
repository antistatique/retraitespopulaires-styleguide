---
title: Header
name: header
collection: organisms
---
{% include '../molecules/big-menu.html.swig' %}
<header class="header">
  <div class="logo-retraitespopulaires svg-responsive">
    <a href="#"><img src="{{data.path}}build/svg/logo-retraitespopulaires.svg" alt="Retraites Populaires" aria-label="Retraites Populaires"></a>
  </div>

  <div class="row">
    <div class="col-xs-6 col-xs-offset-3 hidden-xs">
    search form here
    </div>
  </div>
  <div class="header-nav" aria-hidden="true">
    {% include '../atoms/hamburger.html.swig' with {'hamburger_link': light, 'hamburger_theme': theme} %}
  </div>
</header>
