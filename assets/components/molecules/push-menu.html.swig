---
title: Push Menu
name: push-menu
collection: molecules
notes: |
  Responsive tray for mobile. Specially used as mobile main navigation. <br />
  This component is visible into the [basic page header alternative](/basic-page-header-alt).
---
<nav class="push-menu" aria-label="Navigation principale - Mobile">
  <ul class="list-unstyled m-b-1 main-navigation">

    <!-- Search -->
    <li>
      <form class="rp-site-search-form" action="#" method="GET" id="rp-site-search-form" accept-charset="UTF-8">
        <div class="form-group">
          <div class="input-group full-width">
            <div class="form-item form-no-label">
              <input class="full-width form-text required form-control" type="text" name="q" value="" size="60" maxlength="128" placeholder="Chercher un produit, un document, un contact, ..." required="required" aria-required="true">
            </div>
            <span class="input-group-btn">
              <button class="btn btn-default btn-primary" icon="retraitespopulaires-icon retraitespopulaires-icon-search" type="submit">
                <i class="retraitespopulaires-icon retraitespopulaires-icon-search"></i>
              </button>
            </span>
          </div>
        </div>
      </form>
    </li>

    <li><a class="h3" href="#">Prévoyance</a></li>
    <li class="active">
      <a class="h3" href="#main-content"><span class="sr-only">Page active</span> Immobilier</a>
    </li>
    <li><a class="h3" href="#">Prêts</a></li>
    <li><a class="h3" href="#">Actualités</a></li>
    <li><a class="h3" href="#">CIP</a></li>
    <li><a class="h3" href="#">Contact</a></li>
  </ul>

  <ul class="prenavbar list-unstyled m-0 secondary-navigation" role="navigation" aria-label="Navigation d'en-tête">
    <li class="active">
      <a href="#" class="active h6" target=""><span class="sr-only">Page active</span> Contact</a>
    </li>
    <li>
      <a href="#" class="h6" target="">Presse</a>
    </li>
    <li>
      <a href="#" class="h6" target="">Extranet</a>
    </li>
  </ul>
</nav>
