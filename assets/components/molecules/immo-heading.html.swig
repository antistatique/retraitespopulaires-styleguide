---
title: immo-heading
name: immo-heading
collection: molecules
notes: |
  ##### Usage : `immo-heading`
  ##### Options :
  - **immo_ref** - String
  - **immo_heading** - String
  - **immo_title** - String
  - **theme** - String
---
<div class="immo-heading immo-heading-{{ theme }} shadow shadow-down">
  <div class="immo-heading-heading" style="background-image: url({% if immo-heading_heading  %} {{ immo-heading_heading }} {% else  %} https://unsplash.it/1400/780 {% endif %})"></div>
  <div class="immo-heading-body">
    <div class="immo-heading-title h1">
      {% if immo_title  %}
        {{ immo_title }}
      {% else  %}
        Av. Collonges 12, 1004 Lausanne
      {% endif %}
    </div>
    <div class="spacer spacer-xs"></div>
    <div class="immo-heading-ref h6">
      {% if immo_ref  %}
        Référence: {{ immo_ref }}
      {% else  %}
        Référence: 12356789
      {% endif %}
    </div>
  </div>
</div>
