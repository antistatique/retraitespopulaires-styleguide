---
title: breadcrumb
name: breadcrumb
collection: molecules
notes: |
  ##### Usage : `breadcrumb`
  ##### Options :
  - **theme** - <i>String</i> - <b>lines-['text-assurance'|'text-prevoyance'|'text-immobilier'|'text-hypotheque'|'text-institutionnel'|'text-profelia'|'text-cpev'|'text-cip']</b>
  - **links** - <i>Array</i>
---

<nav class="breadcrumb" role="breadcrumb" aria-label="Vous êtes ici:">
  <h1 class="hidden" aria-level="3">Vous êtes sur ce chemin.</h1>
  <ul class="list-inline list-no-style list-no-padding">
    {% for link in links %}
      {%
        set classes = [

        ]
      %}
      {% if loop.first %}
        {% set classes = ['text-primary'] %}
      {% elseif loop.last %}
        {% set classes = ['text-muted'] %}
      {% else %}
        {% set classes = [theme] %}
      {% endif %}
      <li class="{{ classes }}" aria-label="{{ link }}">{{ link }}</li>
    {% if !loop.last %} <li class="text-muted" aria-label=">">›</li> {% endif %}
    {% endfor %}
  </ul>
</nav>
