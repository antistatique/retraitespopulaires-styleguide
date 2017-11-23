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
<header class="header hidden-print">
  <div class="container container-offset">
    <div class="row">
      <div class="col-xs-12 col-xl-8 col-xl-offset-2">
        <div class="header-container">
          <div class="logo-retraitespopulaires logo-retraitespopulaires-lg logo-retraitespopulaires-offset svg-responsive">
            <a class="" href="#">
              <a href="#"><img src="{{data.path}}build/svg/logo-retraitespopulaires.svg" alt="Retraites Populaires" aria-label="Retraites Populaires"></a>
            </a>
          </div>
          <div class="wrapper-prenavbar m-t-1 hidden-sm hidden-xs">
            {% include '../molecules/prenavbar.html.swig' %}
            <div class="prenavbar-separator prenavbar-separator-invisible" aria-hidden="true"></div>
            <div class="search-box">
              <a href="#" class="search-toggle">
                <span aria-hidden="true" class="retraitespopulaires-icon retraitespopulaires-icon-search"></span>
                <div class="sr-only">Recherche</div>
              </a>
            </div>
          </div>
          <div class="visible-xs-block visible-sm-block" aria-hidden="true">
            <button class="hamburger-wrapper" id="collapser-menu-toggler">
              <div class="hamburger-button">
                <svg class="hamburger-circle" x="0px" y="0px" width="54px" height="54px" viewBox="0 0 54 54">
                  <circle fill="white" stroke="#656e79" stroke-width="1.5" cx="27" cy="27" r="25" stroke-dasharray="157 157" stroke-dashoffset="157"></circle>
                </svg>
                <div class="hamburger">
                  <span></span>
                  <span></span>
                  <span></span>
                </div>
              </div>
              <div class="hamburger-helper text-secondary">
                <div class="helper-when-close">Menu</div>
                <div class="helper-when-open">Fermer</div>
              </div>
            </button>
          </div>
        </div>
        <nav class="navbar hidden-sm hidden-xs" aria-label="Navigation principale">
          <a id="main-navigation" aria-label="Navigation principale"></a>
          <h2 class="sr-only">Navigation principale</h2>
          <ul class="list-unstyled m-0">
            <li>
              <a href="#">Assurance vie</a>
            </li>
            <li>
              <a href="#">Prévoyance professionnelle</a>
            </li>
            <li>
              <a href="#">Immobilier</a>
            </li>
            <li>
              <a href="#">Prêts</a>
            </li>
              </ul>
        </nav>
      </div>
    </div>
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
