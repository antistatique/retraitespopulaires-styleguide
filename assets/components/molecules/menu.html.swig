---
title: Menu
name: menu
collection: molecules
notes: |
  This component is visible into the [basic page](/basic-page).
---
<nav class="rp-access-nav">
  <ul>
    <li><a class="btn btn-primary" href="/" accesskey="1">Page d'accueil du site Retraites Populaires</a></li>
    <li><a class="btn btn-primary" href="#main-content" accesskey="2" >Passer la navigation</a></li>
    <li><a class="btn btn-primary" href="#full-accessible-navigation" accesskey="3" >Accéder à la navigation</a></li>
    <li><a class="btn btn-primary" href="/recherche" accesskey="4" >Accéder au champ de recherche</a></li>
    <li><a class="btn btn-primary" href="mailto:info@retraitespopulaires.ch" accesskey="9">Contacter un conseiller</a></li>
  </ul>
</nav>

<div class="mobile-menu" id="mobile-menu">
  <div class="container-collapser-menu">
    <div class="collapser-menu">

      <!-- Search -->
      <div class="container">
        <div class="spacer spacer-md"></div>
        <form class="rp-site-search-form" action="/recherche" method="GET" id="rp-site-search-form" accept-charset="UTF-8">
          <div class="input-group full-width">
            <div class="form-group form-no-label">
              <input class="full-width form-text required form-control" type="text" name="q" value="" size="60" maxlength="128" placeholder="Chercher un produit, un document, un contact, ..." required="required" aria-required="true">
            </div>
            <span class="input-group-btn">
              <button class="btn btn-default btn-primary" icon="retraitespopulaires-icon retraitespopulaires-icon-search" type="submit">
                <i class="retraitespopulaires-icon retraitespopulaires-icon-search"></i>
              </button>
            </span>
          </div>
        </form>
      </div>

      <!-- Mobile Nav -->
      <div class="container">
        {% include '../molecules/collapser-menu.html.swig' %}
      </div>

    </div>
    <div class="spacer spacer-md"></div>

    {% include '../molecules/menu-secondary-nav.html.swig' %}
  </div>
</div>
