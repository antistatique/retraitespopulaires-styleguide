---
title: menu-complet
name: menu-complet
collection: molecules
notes: |
  ##### Usage : `menu-complet`
  ##### Options :
  - **option** - Type
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
        {% include '../molecules/swiper-menu-complet.html.swig' %}
        </div>
      </div>
      <div class="col-xs-12 col-md-2 col-md-offset-1">
        {% include '../molecules/big-menu-secondary-nav.html.swig' %}
      </div>
    </div>
  </div>
</div>