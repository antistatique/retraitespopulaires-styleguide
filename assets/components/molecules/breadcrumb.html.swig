---
title: breadcrumb
name: breadcrumb
collection: molecules
notes: |
  ##### Usage : `breadcrumb`
  ##### Options :
  - **breadcrumb_primary_theme** - <i>String</i> - <b>['text-primary', 'text-assurance'|'text-prevoyance'|'text-immobilier'|'text-hypotheque'|'text-institutionnel'|'text-profelia'|'text-cpev'|'text-cip']</b><br />
    This is the "home" color.
  - **breadcrumb_theme** - <i>String</i> - <b>['text-assurance'|'text-prevoyance'|'text-immobilier'|'text-hypotheque'|'text-institutionnel'|'text-profelia'|'text-cpev'|'text-cip']</b>
  - **breadcrumb_links** - <i>Array</i>
---

<nav class="breadcrumb" role="breadcrumb" aria-label="Vous êtes ici:">
  <h1 class="hidden" aria-level="3">Vous êtes sur ce chemin.</h1>
  <ul class="list-inline list-no-style list-no-padding">
    {% if breadcrumb_links %}
    {% for link in breadcrumb_links %}
      {%
        set classes = [

        ]
      %}
      {% if loop.first %}
        {% set classes = [breadcrumb_primary_theme|default('text-primary')] %}
      {% elseif loop.last %}
        {% set classes = ['text-muted'] %}
      {% else %}
        {% set classes = [breadcrumb_theme|default('text-primary')] %}
      {% endif %}
      <li class="{{ classes }}" aria-label="{{ link }}">{{ link }}</li>
    {% if !loop.last %} <li class="text-muted" aria-label=">">›</li> {% endif %}
    {% endfor %}
    {% else %}
      <li class="{{ breadcrumb_theme|default('text-primary') }}" aria-label="Accueil">Accueil</li>
      <li class="text-muted" aria-label=">">›</li>
      <li class="{{ breadcrumb_theme|default('text-primary') }}" aria-label="Emploi">Emploi</li>
      <li class="text-muted" aria-label=">">›</li>
      <li class="text-muted" aria-label="Connexion">Connexion</li>
    {% endif %}
  </ul>
</nav>
