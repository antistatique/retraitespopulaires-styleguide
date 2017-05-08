---
title: filters-list [DEPRECATED]
name: filters-list
collection: atoms
notes: |
  ##### Usage : `filters-list`
  ##### Options :
  - **filters_list_title** - <i>String</i>
  - **filters_list_links** - <i>Array</i>
  - **filters_list_theme** - <i>String</i> - <b>['primary'|'assurance'|'prevoyance'|'immobilier'|'hypotheque'|'institutionnel'|'profelia'|'cpev'|'cip']</b>
---
<p class="media-heading text-muted">{{ filters_list_title|default('Votre versement') }}</p>
<ul class="filters-list filters-list-{{ filters_list_theme }}">
  {% for link in filters_list_links|default(['Une seule prime', 'Plusieurs prime']) %}
    <li>
      <i class="retraitespopulaires-icon retraitespopulaires-icon-2x retraitespopulaires-icon-checked"></i>
      <a href="#" class="pretty-link text-{{ filters_list_theme }}">{{ link }}</a>
    </li>
  {% endfor %}
</ul>
