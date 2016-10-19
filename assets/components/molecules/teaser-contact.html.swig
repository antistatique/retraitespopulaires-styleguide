---
title: teaser-contact
name: teaser-contact
collection: molecules
notes: |
  ##### Usage : `teaser-contact`
  ##### Options :
  - **theme** - String
---
<div class="teaser-contact teaser-contact-{{ theme }} shadow shadow-down">
  <a href="#" class="teaser-contact-heading">
    <div class="heading-image" style="background-image: url(https://unsplash.it/780/780?image=1005)"></div>
    <div class="loader-image">{% include '../atoms/loader.html.swig' with {'loader_type': 'yingyang', 'loader_theme': theme} %}</div>
  </a>
  <div class="teaser-contact-body">
    <a href="#" class="h3 pretty-link text-{{ theme }}">Dominique Schmid</a>
    <div class="spacer spacer-sm"></div>
    <p>N'hésitez pas à contacter Dominique Schmid au <a class="pretty-link text-bold text-{{ theme }}" href="tel:0213482626">021 348 26 26</a>.</p>
    <a href="#" class="btn btn-{{ theme }}">Contacter Dominique Schmid</a>
  </div>
</div>
