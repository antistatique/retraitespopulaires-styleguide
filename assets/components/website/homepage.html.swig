---
title: homepage
name: homepage
collection: website
styleguide: false
layout: website.html.swig
---
{% include '../organisms/header.html.swig' %}

{% include '../atoms/funky-waves.html.swig' with {funky_waves_img: 'https://www.retraitespopulaires.ch/sites/default/files/styles/rp_full_screen_xl/public/covers-page/2016-11/coucher-soleil-champs-echallens_2.jpg'} %}

<div class="container-fluid">
  <div class="row">
    <div class="col-xs-12">
      <div class="entity-content">
        <div class="container">
          <h1 class="page-title text-center">Le spécialiste vaudois de l'assurance vie et de la prévoyance professionnelle</h1>
          <div class="spacer"></div>
          <div class="row">
            <div class="col-xs-12 col-sm-4">{% include '../molecules/teaser-profil.html.swig' with {'teaser_profil_icon': true, 'teaser_profil_title': "Particuliers", 'teaser_profil_body': "Retraites Populaires peut vous aider. Que ce soit pour votre épargne, votre famille, votre avenir professionnel, votre retraite ou même votre logement, nous avons des solutions."} %}</div>
            <div class="col-xs-12 col-sm-4">{% include '../molecules/teaser-profil.html.swig' with {'teaser_profil_icon': true, 'teaser_profil_title': "Entreprises", 'teaser_profil_body': "Vous trouverez chez nous de précieux renseignements sur la prévoyance professionnelle et l’assurance vie. Nous avons également des locaux commerciaux à louer."} %}</div>
            <div class="col-xs-12 col-sm-4">{% include '../molecules/teaser-profil.html.swig' with {'teaser_profil_icon': true, 'teaser_profil_title': "Collectivités", 'teaser_profil_body': "Notre gestion d'institutions de prévoyance vous intéressera sûrement ! Nous finançons également la construction de nouvelles infrastructures et de logements."} %}</div>
          </div>
        </div>
      </div>
      <div class="spacer spacer-lg"></div>
      {% include '../organisms/attachments-last-news.html.swig' %}
      <div class="spacer spacer-lg"></div>
      {% include '../organisms/attachments-rentals.html.swig' %}
    </div>
  </div>
</div>
<div class="spacer"></div>
{% include '../organisms/footer.html.swig' %}
