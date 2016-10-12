---
title: particuliers
name: particuliers
collection: website
styleguide: false
layout: website.html.swig
---
{% include '../organisms/header.html.swig' %}

{% include '../atoms/funky-waves.html.swig' with {img: 'https://www.retraitespopulaires.ch/upload/docs/image/png/2011-07/banner-changement-pro.png'} %}


<div class="container">
  <div class="row"></div>
    <div class="col-xs-12 text-center">
      {% include '../molecules/breadcrumb.html.swig' with {theme: 'text-primary', links: ['Accueil', 'Particuliers']} %}
      <div class="spacer"></div>
    </div>
  </div>
</div>

<div class="container-fluid">
  <div class="row">
    <div class="col-xs-12 col-md-8 col-md-offset-2">
      <h1 class="page-title text-center">Je suis un particulier</h1>
      <div class="spacer"></div>
      <div class="entity-content">
        <p>
          Chaque étape du parcours d’une personne est marquée de désirs, ambitions et actions. Retraites Populaires accompagne les Vaudois tout le long de la vie, avec des produits de 3e pilier simples, adaptés à chaque situation et chaque projet.
        </p>
      </div>
    </div>
  </div>
  <div class="spacer spacer-xl"></div>
  <div class="row">
    <div class="col-xs-12">
      <div class="last-news-wrapper">
        <div class="container">
          <div class="row">
            <div class="col-xs-12 last-news-heading">
              <div class="h2 pull-left">Vous avez un nouveau projet ?</div>
            </div>
          </div>
          <div class="row">
            <div class="col-xs-12 col-md-4">
              {% include '../molecules/teaser-basicpage.html.swig' with {'title': 'Fortune', 'links': ['Épargner', 'Payer moins d’impôts', 'Faire fructifier mon patrimoine', 'Vendre un bien immobilier' ]} %}
            </div>
            <div class="col-xs-12 col-md-4">
              {% include '../molecules/teaser-basicpage.html.swig' with {'title': 'Famille', 'links': ['Préparer l’avenir des enfants', 'Protéger les proches', 'Succession' ]} %}
            </div>
            <div class="col-xs-12 col-md-4">
              {% include '../molecules/teaser-basicpage.html.swig' with {'title': 'Travail', 'links': ['Premier emploi', 'Transiter entre deux emplois', 'Indépendants', 'Louer un local commercial', 'Prévoyance professionnelle des employés' ]} %}
            </div>
          </div>
          <div class="row">
            <div class="col-xs-12 col-md-4">
              {% include '../molecules/teaser-basicpage.html.swig' with {'title': 'Retraite', 'links': ['Succession', 'Préparer sa retraite', 'Profiter de sa retraite' ]} %}
            </div>
            <div class="col-xs-12 col-md-4">
              {% include '../molecules/teaser-basicpage.html.swig' with {'title': 'Logement', 'links': ['Louer un appartement', 'Acheter un appartement', 'Vendre un bien immobilier' ]} %}
            </div>
          </div>
        </div>
      </div>
      <div class="spacer spacer-md"></div>
      <div class="last-news-wrapper">
        <div class="container">
          <div class="row">
            <div class="col-xs-12 last-news-heading">
              <div class="h2 pull-left">Déja assuré</div>
            </div>
          </div>
          <div class="row">
            <div class="col-xs-12 col-md-4">
              {% include '../molecules/teaser-basicpage.html.swig' with {'title': 'Assuré 2e pilier'} %}
            </div>
            <div class="col-xs-12 col-md-4">
              {% include '../molecules/teaser-basicpage.html.swig' with {'title': 'Assuré 3e pilier', 'links': ['Attestation pour les impôts', 'Décès', 'Invalidité' ]} %}
            </div>
            <div class="col-xs-12 col-md-4">
              {% include '../molecules/teaser-basicpage.html.swig' with {'title': 'Locataire en place'} %}
            </div>
          </div>
        </div>
      </div>
      <div class="spacer spacer-lg"></div>
      {% include '../molecules/teaser-contact.html.swig' %}
      {% include '../organisms/attachments-job.html.swig' %}
      <div class="spacer spacer-md"></div>
      {% include '../organisms/attachments-last-news.html.swig' %}
      </div>
    </div>
  </div>
</div>
<div class="spacer"></div>
{% include '../organisms/footer.html.swig' %}
