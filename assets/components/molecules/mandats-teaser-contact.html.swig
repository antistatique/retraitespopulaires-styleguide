---
title: mandats-teaser-contact
name: mandats-teaser-contact
collection: molecules
notes: |
  ##### Usage : `mandats-teaser-contact`
  - **theme** - <i>String</i> - <b>mandats-teaser-contact-['assurance'|'prevoyance'|'immobilier'|'hypotheque'|'institutionnel'|'profelia'|'cpev'|'cip']</b>
---
<div class="teaser-contact teaser-contact-{{ theme }} shadow shadow-down">
  <a href="#" class="teaser-contact-heading">
    <div class="heading-image" style="background-image: url(https://unsplash.it/780/780?image=1005)"></div>
    <div class="loader-image">{% include '../atoms/loader.html.swig' with {'loader_type': 'yingyang', 'loader_theme': theme} %}</div>
  </a>
  <div class="teaser-contact-body">
    <a href="#" class="h3 pretty-link text-{{ theme }}">Gestion</a>
    <div class="spacer spacer-sm"></div>
    <p>N'hésitez pas à contacter le service de gestion au <a class="pretty-link text-no-wrap text-bold text-{{ theme }}" href="tel:0213482626">021 348 24 51</a> ou <a class="pretty-link text-no-wrap text-bold text-{{ theme }}" href="tel:0213482626">info@cipvd.ch</a>.</p>
    <a href="#" class="btn btn-{{ theme }}">Contacter</a>
  </div>
</div>