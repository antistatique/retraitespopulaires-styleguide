---
title: homepage
name: homepage
collection: website
styleguide: false
layout: website.html.swig
---
{% include '../organisms/header.html.swig' %}

{% include '../atoms/funky-waves.html.swig' with {img: 'https://www.retraitespopulaires.ch/upload/docs/image/jpeg/2016-07/banner-pilier3a.jpg'} %}

<div class="container-fluid">
  <div class="row">
    <div class="col-xs-12">
      <h1 class="page-title text-center">Le spécialiste vaudois de l'assurance vie et de la prévoyance professionnelle</h1>
      <div class="spacer"></div>
      <div class="entity-content">
        <div class="row">
          <div class="col-xs-12 col-sm-4">{% include '../molecules/teaser-particulier.html.swig' %}</div>
          <div class="col-xs-12 col-sm-4">{% include '../molecules/teaser-entreprise.html.swig' %}</div>
          <div class="col-xs-12 col-sm-4">{% include '../molecules/teaser-collectivites.html.swig' %}</div>
        </div>
      </div>
      <div class="spacer spacer-lg"></div>
      {% include '../organisms/last-news.html.swig' %}
      <div class="spacer spacer-lg"></div>
      {% include '../organisms/rentals.html.swig' %}
    </div>
  </div>
</div>
<div class="spacer"></div>
{% include '../organisms/footer.html.swig' %}
