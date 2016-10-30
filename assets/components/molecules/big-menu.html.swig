---
title: big-menu
name: big-menu
collection: molecules
notes: |
  ##### Usage : `big-menu`
  Ce composant est visible dans le template "<a href="/retraitespopulaires-styleguide/basic-page">Page de base</a>".
---
<nav class="sr-only access-navigation">
  <ul>
    <li><a href="#" accesskey="1">Page d'accueil du site Retraites Populaires</a></li>
    <li><a href="#startcontent" accesskey="2" >Passer la navigation</a></li>
    <li><a href="#global-search" accesskey="4" >Accéder au champ de recherche</a></li>
    <li><a href="mailto:info@retraitespopulaires.ch" accesskey="9">Contacter un conseiller</a></li>
  </ul>
</nav>
<nav class="sr-only" role="navigation">
  <ul>
    <li>
      <h2>Navigation principale</h2>
      <ul>
        <li>
          <a href="#">Assurance vie</a>
          <ul>
            <li><a href="#">RP Rente immédiate</a></li>
            <li><a href="#">RP Rente immédiate certaine</a></li>
            <li><a href="#">RP Jeune</a></li>
          </ul>
        </li>
        <li>
          <a href="#">Prévoyance professionnelle</a>
          <ul>
            <li><a href="#">Pour les entreprises</a></li>
            <li>
              <a href="#">Pour les institutions de prévoyance</a>
              <ul>
                <li><a href="#">Assurer les employés</a></li>
                <li><a href="#">Plans complémentaires</a></li>
              </ul>
            </li>
          </ul>
        </li>
      </ul>
    </li>
    <li>
      <h2>Vous êtes</h2>
      <ul>
        <li>
          <a href="#">Particuliers</a>
          <h3>Nouveau projet</h3>
          <ul>
            <li>
              <a href="#">Fortune</a>
              <ul>
                <li><a href="#">Épargner</a></li>
                <li><a href="#">Payer moins d'impôts</a></li>
              </ul>
            </li>
            <li><a href="#">Famille</a></li>
          </ul>
          <h3>Déjà client</h3>
          <ul>
            <li><a href="#">Assuré 2e pilier</a></li>
            <li>
              <a href="#">Assuré 3e pilier</a>
              <ul>
                <li><a href="#">Décès</a></li>
                <li><a href="#">Invalidité</a></li>
              </ul>
            </li>
          </ul>
        </li>
        <li>
          <a href="#">Professionnels</a>
          <ul>
            <li><a href="#">Prévoyance professionnelle</a></li>
            <li><a href="#">Location de local commercial</a></li>
          </ul>
        </li>
      </ul>
    </li>
    <li>
      <h2>Navigation secondaire</h2>
      <ul>
        <li><a href="#">À propos</a></li>
        <li><a href="#">Contact</a></li>
        <li><a href="#">Actualités</a></li>
        <li><a href="#">Faq</a></li>
      </ul>
    </li>
  </ul>
</nav>
<div class="big-menu" aria-hidden="true">
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
