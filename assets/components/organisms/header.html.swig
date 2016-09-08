---
title: header
name: header
collection: organisms
notes: |
  ##### Usage : `header`
  ##### Options :
  - **option** - Type
---
{% include '../molecules/big-menu.html.swig' %}
<header class="header">
  {% include '../atoms/logo-retraitespopulaires.html.swig' %}

  <div class="row">
    <div class="col-xs-6 col-xs-offset-3">
      <form class="global-search">
          <label class="label-hidden"></label>
          <div class="input-group">
            <input type="text" class="form-control" placeholder="Chercher un produit, un document, un contact, ...">
            <span class="input-group-btn">
              <button class="btn btn-default btn-icon" type="button"><i class="retraitespopulaires-icon retraitespopulaires-icon-search"></i></button>
            </span>
          </div>
      </form>
    </div>
  </div>

  <div class="header-nav">
    {% include '../atoms/hamburger.html.swig' %}
  </div>
</header>
