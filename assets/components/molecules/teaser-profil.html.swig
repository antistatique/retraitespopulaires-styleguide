---
title: teaser-profil
name: teaser-profil
collection: molecules
notes: |
  ##### Usage : `teaser-profil`
  - **teaser_profil_icon** - <i>Boolean</i>
  - **teaser_profil_title** - <i>String</i>
  - **teaser_profil_body** - <i>String</i>
  - **teaser_profil_theme** - <i>String</i> - <b>teaser-['primary'|'assurance'|'prevoyance'|'immobilier'|'hypotheque'|'institutionnel'|'profelia'|'cpev'|'cip']</b>
---
<a href="#" class="teaser teaser-{{teaser_profil_theme}} teaser-fullclick teaser-profil shadow shadow-down">
  <div class="profil-heading">
    <div class="text-primary {% if teaser_profil_icon %} icon-text icon-text-center {% endif %}">
    {% if teaser_profil_icon %}
      <span class="retraitespopulaires-icon retraitespopulaires-icon-placeholder retraitespopulaires-icon-2x"></span>
      <div class="icon-text-txt text-secondary h4 text-{{teaser_profil_theme}}">{{ teaser_profil_title|default('Profil') }}</div>
    {% else %}
      <div class="text-secondary h4 text-{{teaser_profil_theme}}">{{ teaser_profil_title|default('Profil') }}</div>
    {% endif %}
    </div>
  </div>
  <div class="profil-body">
    {% if teaser_profil_body %}
      <p>{{ teaser_profil_body }}</p>
    {% else %}
      <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.</p>
    {% endif %}
  </div>
</a>
