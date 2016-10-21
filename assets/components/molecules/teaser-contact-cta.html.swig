---
title: teaser-contact-cta
name: teaser-contact-cta
collection: molecules
notes: |
  ##### Usage : `teaser-contact-cta`
  ##### Options :
  - **theme** - <i>String</i> - <b>teaser-contact-cta-['assurance'|'prevoyance'|'immobilier'|'hypotheque'|'institutionnel'|'profelia'|'cpev'|'cip']</b>
---
<a href="#" class="teaser teaser-{{ theme }} teaser-fullclick teaser-contact-cta teaser-contact-cta-{{ theme }} shadow shadow-down">
  <div class="teaser-contact-cta-heading">
    <div class="heading-image" style="background-image: url(https://unsplash.it/780/780?image=1005)"></div>
    <div class="loader-image">{% include '../atoms/loader.html.swig' with {'loader_type': 'yingyang', 'loader_theme': theme} %}</div>
  </div>
  <div class="teaser-contact-cta-body text-center">
    <div class="spacer spacer-xs"></div>
    <p class="text-small">Contactez notre conseiller Dominique Schmid</p>
  </div>
</a>
