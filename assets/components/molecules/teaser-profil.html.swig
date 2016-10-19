---
title: teaser-profil
name: teaser-profil
collection: molecules
notes: |
  ##### Usage : `teaser-profil`
  - **teaser_profil_icon** - Boolean
  - **teaser_profil_title** - String
  - **teaser_profil_body** - String
---
<a href="#" class="teaser-profil shadow shadow-down">
  <div class="profil-heading">
    <div class="text-primary {% if teaser_profil_icon %} icon-text icon-text-center {% endif %}">
    {% if teaser_profil_icon %}
      <span class="retraitespopulaires-icon retraitespopulaires-icon-placeholder retraitespopulaires-icon-2x"></span>
      <div class="icon-text-txt text-cocon h4">{{ teaser_profil_title|default('Profil') }}</div>
    {% else %}
      <div class="text-cocon h4">{{ teaser_profil_title|default('Profil') }}</div>
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
