---
title: news
name: news
collection: website
styleguide: false
layout: website.html.swig
---
{% include '../organisms/header.html.swig' %}
{% include '../atoms/funky-waves.html.swig' %}

<div class="container">
  <div class="row">
    <div class="col-xs-12 text-center">
      {% include '../molecules/breadcrumb.html.swig' with {breadcrumb_theme: 'text-primary', breadcrumb_links: ['Accueil', 'Actualités', 'Avec la Nuit des images, samedi 25 juin 2016']} %}
      <div class="spacer"></div>
    </div>
  </div>
</div>

<div class="container-fluid">
  <div class="row">
    <div class="col-xs-12 col-md-10 col-md-push-1 col-xl-6 col-xl-push-3">
      <h1 class="page-title text-center">Avec la Nuit des images, samedi 25 juin 2016'</h1>
      <div class="spacer"></div>
      <h2 class="h4 text-secondary">Retraites Populaires soutient l'événement au Musée de l'Elysée.</h2>
      <div class="spacer spacer-sm"></div>
      <div class="entity-content">
        <p>
          La Nuit des images 2016 se tient samedi 25 juin au Musée de l'Elysée. Rendez-vous culturel gratuit désormais incontournable de l'été lausannois, il invite le public à apprécier l'image sous diverses formes.
          <br/><br/>
          Retraites Populaires reconduit son soutien à la manifestation, plus particulièrement à la Nuit des enfants, activité pour les familles où petits et grands sont invités à mettre la main à la pâte. Il s'agira de créer une œuvre collective avec Martin Becka en composant une fresque de photogrammes et de produire une camera obscura portative pour résoudre une énigme à travers les jardins de l'Elysée. L'occasion aussi pour les enfants de se plonger dans des livres de photographie et de se laisser entraîner dans le conte d'Amadou l'audacieux.
        </p><br/>
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

<div class="row">
  <div class="col-xs-12">
  <div class="row">
    <div class="spacer spacer-lg"></div>
    {% include '../organisms/attachments-offers.html.swig' %}
    </div>
  </div>
</div>

<div class="spacer"></div>
{% include '../organisms/footer.html.swig' %}
