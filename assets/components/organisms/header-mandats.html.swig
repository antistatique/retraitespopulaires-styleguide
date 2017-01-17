---
title: header-mandats
name: header-mandats
collection: organisms
notes: |
  ##### Usage : `header-mandats`
  ##### Options :
  - **header_mandats_theme** - <i>String</i> - <b>['assurance'|'prevoyance'|'immobilier'|'hypotheque'|'institutionnel'|'profelia'|'cpev'|'cip']</b>
---
<header class="header-mandat">
  <div class="container">
  <div class="row">
    <div class="col-xs-4 col-lg-6">
       <a class="" href="#">
          <img class="header-mandat-logo" src="/retraitespopulaires-styleguide/build/svg/logo_cip.svg" alt="Logo CIP" title="Page d'accueil">
       </a>
    </div>

    <div class="col-xs-8 col-lg-6">

      {% include '../molecules/push-menu.html.swig' with {'push_menu_theme': header_mandats_theme} %}

      <div class="wrapper-navs">
        <div class="wrapper-prenavbar">
          {% include '../molecules/prenavbar.html.swig' with {'prenavbar_theme': header_mandats_theme} %}

          <div class="prenavbar-separator" aria-hidden="true"></div>

          {% include '../atoms/search-box.html.swig' with {'search_box_theme': header_mandats_theme} %}
        </div>

        <div class="wrapper-navbar">
          {% include '../molecules/navbar.html.swig' with {'navbar_theme': header_mandats_theme} %}
        </div>
      </div>

      <div class="hamburger-mandat-toggle">
        {% include '../atoms/hamburger-mandat.html.swig' with {'hamburger_theme': header_mandats_theme} %}
      </div>

    </div>
  </div><!-- /.container -->
</header>
