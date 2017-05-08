---
title: facets-list [DEPRECATED]
name: facets-list
collection: atoms
notes: |
  ##### Usage : `facets-list`
  ##### Options :
  - **facets_title** - <i>String</i>
  - **facets_links** - <i>Array</i>
  - **facets_theme** - <i>String</i> - <b>['primary'|'assurance'|'prevoyance'|'immobilier'|'hypotheque'|'institutionnel'|'profelia'|'cpev'|'cip']</b>
---
<p class="media-heading text-muted">{{ facets_title }}</p>
<ul class="facets-list">
  {% if facets_links %}
    {% for link in facets_links %}
      <li><a href="#" class="pretty-link text-{{facets_theme}}">{{ link }}</a></li>
    {% endfor %}
  {% else %}
      <li><a href="#" class="pretty-link text-{{facets_theme}}">Liens 1</a></li>
      <li><a href="#" class="pretty-link text-{{facets_theme}}">Velit quia eum est dolore quod et repellat.</a></li>
  {% endif %}
</ul>
