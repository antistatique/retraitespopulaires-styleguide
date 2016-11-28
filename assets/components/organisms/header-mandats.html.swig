---
title: header-mandats
name: header-mandats
collection: organisms
notes: |
  ##### Usage : `header-mandats`
  ##### Options :
  - **theme** - <i>String</i> - <b>['assurance'|'prevoyance'|'immobilier'|'hypotheque'|'institutionnel'|'profelia'|'cpev'|'cip']</b>
---
<header class="header-mandat">
  <img class="img-responsive" src="/retraitespopulaires-styleguide/build/svg/logo_cip.svg" alt="Logo - CIP">

  <div class="header-navbar">
    {% include '../molecules/navbar.html.swig' %}
  </div>
</header>
