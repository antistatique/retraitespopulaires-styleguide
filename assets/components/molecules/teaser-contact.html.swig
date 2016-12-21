---
title: teaser-contact
name: teaser-contact
collection: molecules
notes: |
  ##### Usage : `teaser-contact`
  ##### Options :
  - **teaser_contact_title** - <i>String</i>
  - **teaser_contact_body** - <i>String</i>
  - **teaser_contact_mail** - <i>String</i>
  - **teaser_contact_phone** - <i>String</i>
  - **theme** - <i>String</i> - <b>teaser-contact-['assurance'|'prevoyance'|'immobilier'|'hypotheque'|'institutionnel'|'profelia'|'cpev'|'cip']</b>
---
<div class="teaser-contact teaser-contact-{{ theme }} shadow shadow-down">
  <a href="#" class="teaser-contact-heading">
    <div class="heading-image" style="background-image: url(https://unsplash.it/780/780?image=1005)"></div>
    <div class="loader-image">{% include '../atoms/loader.html.swig' with {'loader_type': 'yingyang', 'loader_theme': theme} %}</div>
  </a>
  <div class="teaser-contact-body">
    <a href="#" class="h3 pretty-link text-{{ theme }}">{{ teaser_contact_title|default('Dominique Schmid') }}</a>
    <div class="spacer spacer-sm"></div>

    <p>
      {{ teaser_contact_body|default("N'hésitez pas à contacter Dominique Schmid") }} au <a class="pretty-link text-no-wrap text-bold text-{{ theme }}" href="tel:{{ teaser_contact_phone|default('0213482626') }}">{{ teaser_contact_phone|default('021 348 24 51') }}</a>
      {% if teaser_contact_mail %}
         ou <a class="pretty-link text-no-wrap text-bold text-{{ theme }}" href="mailto:{{ teaser_contact_mail }}">{{ teaser_contact_mail }}</a>.
      {% else %}
        .
      {% endif %}
    </p>
    <a href="#" class="btn btn-{{ theme }}">Contacter</a>
  </div>
</div>
