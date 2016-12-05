---
title: header-mandats
name: header-mandats
collection: organisms
notes: |
  ##### Usage : `header-mandats`
  ##### Options :
  - **theme** - <i>String</i> - <b>['assurance'|'prevoyance'|'immobilier'|'hypotheque'|'institutionnel'|'profelia'|'cpev'|'cip']</b>
---
{# NEED REFACORING #}
<style media="screen">
  .submenu{
    padding: 0.6em 0 0.4em;
  }
  .submenu a{
    color: #00a3e3;
    padding: 0 0.3em;
  }
</style>
<div class="submenu">
  <div class="container">
    <div class="row">
      <div class="col-xs-12">
        <a href="#" class="btn-link btn-xs pull-right">Recherche</a>
        <a href="#" class="btn-link btn-xs pull-right">FAQ</a>
        <a href="#" class="btn-link btn-xs pull-right">Extranet</a>
        <a href="#" class="btn-link btn-xs pull-right">Presse</a>
      </div>
    </div>
  </div>
</div>
{# NEED REFACORING #}
<header class="header-mandat">
  <div class="container">
    <div class="header-navbar">
      {% include '../molecules/navbar.html.swig' %}
    </div>
  </div>
</header>
<div class="spacer"></div>
