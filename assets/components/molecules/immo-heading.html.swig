---
title: immo-heading
name: immo-heading
collection: molecules
notes: |
  ##### Usage : `immo-heading`
  ##### Options :
  - **immo_ref** - <i>String</i>
  - **immo_loyer** - <i>String</i>
  - **immo_pieces** - <i>String</i>
  - **immo_charges** - <i>String</i>
  - **immo_surface** - <i>String</i>
  - **immo_heading** - <i>String</i>
  - **theme** - <i>String</i> - <b>immo-heading-['assurance'|'prevoyance'|'immobilier'|'hypotheque'|'institutionnel'|'profelia'|'cpev'|'cip']</b>
---
<div class="immo-heading immo-heading-{{ theme }} shadow shadow-down">
  <div class="immo-heading-heading" style="background-image: url({% if immo-heading_heading  %} {{ immo-heading_heading }} {% else  %} https://immobilier.retraitespopulaires.ch/data/images/thumbs/detail/10138_8212.jpg {% endif %})"></div>
  <div class="immo-heading-body">
    <div class="spacer spacer-xs"></div>
    <p>
      {% if immo_ref  %}
        <span class="text-bold">Référence :</span> {{ immo_ref }}
      {% else  %}
        <span class="text-bold">Référence :</span> 12356789
      {% endif %}
    </p>
    <p>
      {% if immo_loyer  %}
        <span class="text-bold">Loyer mensuel :</span> {{ immo_loyer }}
      {% else  %}
        <span class="text-bold">Loyer mensuel :</span> CHF 1'440.-
      {% endif %}
    </p>
    <p>
      {% if immo_pieces  %}
        <span class="text-bold">Pièces :</span> {{ immo_pieces }}
      {% else  %}
        <span class="text-bold">Pièces :</span> 2.5
      {% endif %}
    </p>
    <p>
      {% if immo_charges  %}
        <span class="text-bold">Charges :</span> {{ immo_charges }}
      {% else  %}
        <span class="text-bold">Charges :</span> CHF 60.-
      {% endif %}
    </p>
    <p>
      {% if immo_surface  %}
        <span class="text-bold">Surface :</span> {{ immo_surface }}
      {% else  %}
        <span class="text-bold">Surface :</span> ~38 m2
      {% endif %}
    </p>
  </div>
</div>
