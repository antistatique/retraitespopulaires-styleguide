---
title: big-menu
name: big-menu
collection: molecules
notes: |
  ##### Usage : `big-menu`
  Ce composant est visible dans le template "<a href="/retraitespopulaires-styleguide/big-menu">Big-Menu</a>"
---
<div class="big-menu">
  <div class="container-big-menu container-fuild">
    <div class="row">
      <div class="col-no-padding col-xs-12 visible-xs">
      {% include '../molecules/search-form.html.swig' %}
      <div class="spacer"></div>
      </div>
    </div>

    <div class="row">
      <div class="col-md-9">
        <div class="row">
        {% include '../molecules/swiper-menu.html.swig' %}
        </div>
      </div>
      <div class="col-xs-12 col-md-2 col-md-offset-1">
        {% include '../molecules/big-menu-secondary-nav.html.swig' %}
      </div>
    </div>
  </div>
</div>
