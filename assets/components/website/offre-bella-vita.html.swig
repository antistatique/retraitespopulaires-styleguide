---
title: offre-bella-vita
name: offre-bella-vita
collection: website
styleguide: false
layout: website.html.swig
---
{% include '../organisms/header.html.swig' %}
{% include '../atoms/funky-waves.html.swig' %}

<div class="container">
  <div class="row">
    <div class="col-xs-12 text-center">
      {% include '../molecules/breadcrumb.html.swig' with {breadcrumb_theme: 'text-primary', breadcrumb_links: ['Accueil', 'Offre Bella Vita', 'Festival Lavaux Classic']} %}
      <div class="spacer"></div>
    </div>
  </div>
</div>

<div class="container-fluid">
  <div class="row">
    <div class="col-xs-12 col-md-10 col-md-push-1 col-xl-6 col-xl-push-3">
      <h1 class="page-title text-center">Festival Lavaux Classic</h1>
      <div class="spacer"></div>
      <h2 class="h4 text-secondary">15 x 2 billets à gagner. Gagnez 2 billets Du 24 juin au 3 juillet 2016</h2>
      <div class="spacer spacer-sm"></div>
      <div class="entity-content">
        <p>
          Lavaux Classic est une formule unique qui allie exigence artistique, proximité de tous les instants et découverte d’un terroir exceptionnel. Manifestation au profil dynamique et insolite, Lavaux Classic s’étend sur l’un des plus beaux paysages culturels du monde : Lavaux, région viticole classée au patrimoine mondial de l’UNESCO. Au programme, plus d’une centaine d’événements autour d’une thématique choisie : concerts payants de plusieurs salles de la région, concerts gratuits au bord du lac, activités de découverte de Lavaux, conférences et événements pour les enfants.
        </p><br/>
      </div>

      <div class="spacer"></div>
      <div class="row">
        <div class="col-xs-8 col-xs-offset-2">
          {% include '../organisms/form-offer-bella-vita.html.swig' %}
        </div>
      </div>

    </div>
  </div>
</div>

<div class="row">
  <div class="col-xs-12">
  <div class="row">
    <div class="spacer spacer-lg"></div>
    {% include '../organisms/attachments-last-news.html.swig' %}
    </div>
  </div>
</div>

<div class="spacer"></div>
{% include '../organisms/footer.html.swig' %}
