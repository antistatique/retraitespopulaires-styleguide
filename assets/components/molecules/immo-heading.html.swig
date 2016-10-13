---
title: immo-heading
name: immo-heading
collection: molecules
notes: |
  ##### Usage : `immo-heading`
  ##### Options :
  - **immo_ref** - String
  - **immo_loyer** - String
  - **immo_pieces** - String
  - **immo_charges** - String
  - **immo_surface** - String
  - **immo_heading** - String
  - **theme** - String
---
<div class="immo-heading immo-heading-{{ theme }} shadow shadow-down">
  <div class="immo-heading-heading" style="background-image: url({% if immo-heading_heading  %} {{ immo-heading_heading }} {% else  %} https://immobilier.retraitespopulaires.ch/data/images/thumbs/detail/10138_8212.jpg {% endif %})"></div>
  <div class="immo-heading-body">
    <div class="spacer spacer-xs"></div>
    <p>
      {% if immo_ref  %}
        Référence: {{ immo_ref }}
      {% else  %}
        Référence : 12356789
      {% endif %}
    </p>
    <p>
      {% if immo_loyer  %}
        Loyer mensuel : {{ immo_loyer }}
      {% else  %}
        Loyer mensuel 1'440.-
      {% endif %}
    </p>
    <p>
      {% if immo_pieces  %}
        Pièces : {{ immo_pieces }}
      {% else  %}
        Pièces : 2.5
      {% endif %}
    </p>
    <p>
      {% if immo_charges  %}
        Pièces : {{ immo_charges }}
      {% else  %}
        Charges : 60.-
      {% endif %}
    </p>
    <p>
      {% if immo_surface  %}
        Surface : {{ immo_surface }}
      {% else  %}
        Surface ~38 m2
      {% endif %}
    </p>
  </div>
</div>
