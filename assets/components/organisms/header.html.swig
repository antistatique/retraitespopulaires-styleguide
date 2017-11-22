---
title: Header
name: header
collection: organisms
changes:
  3.1.0: "**Component is refactored**. Must be updated in all instances."
notes: |
  Add the `.header-container` to enable the flex header (add a `.container.header-container` inside the `.header`).

  Add the `.header-shadow` to add a drop shadow below the header. Designers don't recommend it though.
variants:
  mandat: Header Mandat
---
{% if variant !== 'mandat' %}
{% include '../molecules/menu.html.swig' %}
<header class="header header-container">
  <div class="logo-retraitespopulaires svg-responsive">
    <a href="#"><img src="{{data.path}}build/svg/logo-retraitespopulaires.svg" alt="Retraites Populaires" aria-label="Retraites Populaires"></a>
  </div>

  <div class="header-search hidden-xs">
    <!-- see input-group component -->
    <div class="form-group">
      <div class="input-group full-width">
        <input type="text" class="form-control full-width" placeholder="Rechercher des documents, articles, ...">
        <span class="input-group-btn">
          <button class="btn btn-primary" type="button">Rechercher</button>
        </span>
      </div>
    </div>
    <!-- /input-group -->
  </div>
  <div class="header-nav" aria-hidden="true">
    {% include '../atoms/hamburger.html.swig' %}
  </div>
</header>
{% else %}
<header class="header">
  <div class="container header-container">
    <div class="logo-retraitespopulaires logo-retraitespopulaires-lg">
      <a class="" href="#">
        <img class="img-responsive" src="{{data.path}}build/svg/logo-cip.svg" alt="Logo CIP" title="Page d'accueil">
      </a>
    </div>

    <div class="wrapper-navs">
      <div class="wrapper-prenavbar">
        {% include '../molecules/prenavbar.html.swig' %}

        <div class="prenavbar-separator" aria-hidden="true"></div>

        {% include '../atoms/search-box.html.swig' %}
      </div>

      <div class="wrapper-navbar">
        {% include '../molecules/navbar.html.swig' %}
      </div>
    </div>

    <div class="header-nav js-header-push hidden-md hidden-lg hidden-xl">
      {% include '../atoms/hamburger.html.swig' %}
    </div>
  </div>
  {% include '../molecules/push-menu.html.swig' %}
</header>
{% endif %}
