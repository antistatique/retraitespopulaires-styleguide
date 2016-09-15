---
title: famille
name: famille
collection: pages
styleguide: false
layout: page.html.swig
---
{% include '../organisms/header-complet.html.swig' %}
<div class="wrapper-funky-waves">

  <img src="http://www.famillesausommet.com/images/famille_accueil.jpg" />

  <div class="funky-waves-container">

    <svg class="wave-1" version="1.1" viewBox="0 0 1920 200" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" >
        <path fill="#FFFFFF" d="M1920,136V73 c-189,83-636,77-980-6 C504-40,274-1,0,65.0277l0,70.7052L1920,136z"/>
        <rect fill="#FFFFFF" y="120" width="100%" height="80px" />
    </svg>

    <svg class="wave-2" version="1.1" viewBox="0 0 1920 200" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" >
      <path opacity="0.33" fill="#FFFFFF" d="M1920,224V35 C1425-73,706,103,458,95 C209,88,0,36,0,36.7297L0,224H1920z"/>
      <rect opacity="0.33" fill="#FFFFFF" y="120" width="100%" height="80px" />
    </svg>

    <svg class="wave-3" version="1.1" viewBox="0 0 1920 250" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" >
      <path opacity="0.33" fill="#FFFFFF" d="M1920,255.7411 c-238.2285,5.4757-530.3276-76.7562-851.5579-167.1589 C714.4314-11.0472,354.1524-46.003,0,86.859l0,168.6148L1920,255.7411L1920,255.7411z"/>
      <rect opacity="0.33" fill="#FFFFFF" y="170" width="100%" height="80px" />
    </svg>
  </div>

</div>

<div class="container">
  <div class="row"></div>
    <div class="col-xs-12 col-md-7 col-md-offset-4 col-lg-8 col-lg-offset-3 col-xl-6 col-xl-offset-3 text-center">
      <div class="breadcrumb">
        <ul class="list-inline list-no-style list-no-padding">
          <li class="text-primary"> <a href="/retraitespopulaires-styleguide/homepage-test">Accueil</a></li>
          <li class="text-muted">›</li>
          <li class="text-primary">Particuliers</li>
          <li class="text-muted">›</li>
          <li class="text-muted">Famille</li>
        </ul>
      </div>
      <div class="spacer"></div>
    </div>
  </div>
</div>

<div class="container-fluid">
  <div class="row">
    <div class="col-xs-12 col-md-7 col-md-push-4 col-lg-8 col-lg-push-3 col-xl-6 col-xl-push-3">
      <h1 class="page-title text-center">Famille</h1>
      <div class="spacer"></div>
      <div class="entity-content">
        <p>
          Chaque étape du parcours d’une personne est marquée de désirs, ambitions et actions. Retraites Populaires accompagne les Vaudois tout le long de la vie, avec des produits de 3e pilier simples, adaptés à chaque situation et chaque projet.
        </p>
      </div>
      <div class="spacer spacer-lg"></div>
      <div class="row">
          <div class="col-xs-12 col-sm-4">
            <div class="teaser-basicpage shadow shadow-down">
              <div class="basicpage-heading">
                <div class="text-primary icon-text icon-text-center">
                  <a href="#" class="icon-text-txt text-cocon h4">Préparer l'avenir de ses enfants</a>
                </div>
              </div>
              <div class="basicpage-body">
                <p>Offrez à un enfant un cadeau pour l’avenir! Votre épargne le soutiendra dans ses projets. CHF 50 offerts!</p>
              </div>
            </div>
          </div>
          <div class="col-xs-12 col-sm-4">
            <div class="teaser-basicpage shadow shadow-down">
              <div class="basicpage-heading">
                <div class="text-primary icon-text icon-text-center">
                  <a href="#" class="icon-text-txt text-cocon h4">Protéger les proches</a>
                </div>
              </div>
              <div class="basicpage-body">
                <p>Sécurisez votre avenir! Protégez votre conjoint ou votre famille, garantissez un emprunt bancaire ou assurez la pérennité de votre entreprise.</p>
              </div>
            </div>
          </div>
          <div class="col-xs-12 col-sm-4">
            <div class="teaser-basicpage shadow shadow-down">
              <div class="basicpage-heading">
                <div class="text-primary icon-text icon-text-center">
                  <a href="#" class="icon-text-txt text-cocon h4">Succession</a>
                </div>
              </div>
              <div class="basicpage-body">
                <p>Profitez de votre retraite! Placez un capital de manière sûre et bénéficiez tout de suite de rentes à vie.</p>
              </div>
            </div>
          </div>
      </div>
    </div>
    <div class="col-xs-12 col-md-4 col-md-pull-7 col-lg-3 col-lg-pull-8 col-xl-2 col-xl-pull-6">
      <div class="spacer spacer-xl visible-xs visible-sm"></div>
      {% include '../molecules/secondary-nav-famille.html.swig' with {'theme': 'primary'} %}
    </div>
    <div class="row">
      <div class="col-xs-12">
      <div class="row">
        <div class="spacer spacer-lg"></div>
        {% include '../molecules/teaser-contact.html.swig' %}
        {% include '../organisms/attachments-job.html.swig' %}
        <div class="spacer spacer-md"></div>
        {% include '../organisms/last-news.html.swig' %}
        </div>
      </div>
    </div>    
  </div>
</div>   
<div class="spacer"></div>
{% include '../organisms/footer.html.swig' %}