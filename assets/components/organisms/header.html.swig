---
title: Header
name: header
collection: organisms
notes: |
  Add the `.header-container` to enable the flex header (add a `.container.header-container` inside the `.header`)
---
{% include '../molecules/big-menu.html.swig' %}
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
    {% include '../atoms/hamburger.html.swig' with {'hamburger_link': light, 'hamburger_theme': theme} %}
  </div>
</header>
