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

<div class="breadcrumb">
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
      <li class="{{ classes }}">{{ link }}</li>
      {% if !loop.last %} <li class="text-muted">›</li> {% endif %}
    {% endfor %}
  </ul>
</div>
