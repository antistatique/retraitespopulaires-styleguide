---
title: teaser-rental
name: teaser-rental
collection: molecules
notes: |
  ##### Usage : `teaser-rental`
  ##### Options :
  - **rental_type** - <i>String</i>
  - **rental_heading** - <i>String</i>
  - **rental_title** - <i>String</i>
  - **rental_address** - <i>String</i>
  - **rental_rooms** - <i>String</i>
  - **rental_surface** - <i>String</i>
  - **rental_rent** - <i>String</i>
  - **rental_orientation** - <i>String</i> - <b>teaser-rental-orientation-['portrait'|'landscape']</b>
  - **rental_theme** - <i>String</i> - <b>teaser-rental-['assurance'|'prevoyance'|'immobilier'|'hypotheque'|'institutionnel'|'profelia'|'cpev'|'cip']</b>
---
<a href="#" class="teaser teaser-{{ rental_theme }} teaser-fullclick teaser-rental teaser-rental-{{ rental_theme }} teaser-rental-orientation-{{ rental_orientation }} shadow shadow-down">
  <div class="rental-heading">
    <div class="heading-image" style="background-image: url({% if rental_heading  %} {{ rental_heading }} {% else  %} https://unsplash.it/780/780?image=1005 {% endif %})"></div>
    <div class="loader-image">{% include '../atoms/loader.html.swig' with {'loader_type': 'yingyang', 'loader_theme': rental_theme} %}</div>
  </div>
  <div class="rental-body">
    <div class="row">
       <div class="col-sm-12">
        <h5 class="rental-type h5 text-muted">
          {% if rental_type  %}
            {{ rental_type }}
          {% else  %}
            Appartement
          {% endif %}
        </h5>
      </div>
    </div>
    <div class="spacer spacer-xs"></div>
    <div class="row">
      <div class="col-sm-12">
        <h1 class="rental-title h1 link-immobilier">
          {% if rental_address  %}
            {{ rental_address }}
          {% else  %}
            Av. Collonges 12, 1004 Lausanne
          {% endif %}
        </h1>
      </div>
    </div>
    <div class="spacer spacer-sm"></div>
    <div class="row info">
      <div class="col-sm-6 info-property">
        <div>
          {% if rental_rooms  %}
            {{ rental_rooms }} pièces(s)
          {% else  %}
            3.5 pièces(s)
          {% endif %}
        </div>
        <div>
          {% if rental_surface  %}
            ±{{ rental_surface }}m<sup>2</sup>
          {% else  %}
            ±64m<sup>2</sup>
          {% endif %}
        </div>
      </div>
      <div class="col-sm-6 info-rent">
        <div>Loyer total</div>
        <div>
        {% if rental_rent  %}
          {{ rental_rent }}.-
        {% else  %}
          1'710.-
        {% endif %}
        </div>
      </div>
    </div>
  </div>
</a>
