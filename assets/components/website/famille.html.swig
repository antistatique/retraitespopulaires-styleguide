---
title: famille
name: famille
collection: website
styleguide: false
layout: website.html.swig
---
{% include '../organisms/header.html.swig' %}

{% include '../atoms/funky-waves.html.swig' with {img: 'http://www.famillesausommet.com/images/famille_accueil.jpg'} %}

<div class="container">
  <div class="row">
    <div class="col-xs-12 col-md-7 col-md-offset-4 col-lg-8 col-lg-offset-3 col-xl-6 col-xl-offset-3 text-center">
      {% include '../molecules/breadcrumb.html.swig' with {theme: 'text-primary', links: ['Accueil', 'Particuliers', 'Famille']} %}
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
            {% include '../molecules/teaser-basicpage.html.swig' with {'title': 'Préparer l’avenir de ses enfants', 'body': 'Offrez à un enfant un cadeau pour l’avenir! Votre épargne le soutiendra dans ses projets. CHF 50 offerts!'} %}
          </div>
          <div class="col-xs-12 col-sm-4">
            {% include '../molecules/teaser-basicpage.html.swig' with {'title': 'Protéger les proches', 'body': 'Sécurisez votre avenir! Protégez votre conjoint ou votre famille, garantissez un emprunt bancaire ou assurez la pérennité de votre entreprise.'} %}
          </div>
          <div class="col-xs-12 col-sm-4">
            {% include '../molecules/teaser-basicpage.html.swig' with {'title': 'Succession', 'body': 'Profitez de votre retraite! Placez un capital de manière sûre et bénéficiez tout de suite de rentes à vie.'} %}
          </div>
      </div>
    </div>
    <div class="col-xs-12 col-md-4 col-md-pull-7 col-lg-3 col-lg-pull-8 col-xl-2 col-xl-pull-6">
      <div class="spacer spacer-xl visible-xs visible-sm"></div>
      {% include '../molecules/secondary-nav.html.swig' with {'theme': 'primary', 'json': 'particuliers'} %}
    </div>
  </div>
</div>

<div class="spacer spacer-lg"></div>
{% include '../organisms/attachments-contact.html.swig' %}
<div class="spacer spacer-lg"></div>
{% include '../organisms/attachments-job.html.swig' %}
<div class="spacer spacer-md"></div>
{% include '../organisms/attachments-last-news.html.swig' %}
</div>

<div class="spacer"></div>
{% include '../organisms/footer.html.swig' %}
