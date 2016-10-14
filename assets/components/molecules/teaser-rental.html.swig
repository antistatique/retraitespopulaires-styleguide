---
title: teaser-rental
name: teaser-rental
collection: molecules
notes: |
  ##### Usage : `teaser-rental`
  ##### Options :
  - **rental_orientation** - String
  - **rental_type** - String
  - **rental_heading** - String
  - **rental_title** - String
  - **rental_address** - String
  - **rental_rooms** - String
  - **rental_surface** - String
  - **rental_rent** - String
  - **theme** - String
---
<div class="teaser-rental teaser-rental-{{ theme }} teaser-rental-orientation-{{ rental_orientation }} shadow shadow-down">
  <a href="#" class="rental-heading">
    <div class="heading-image" style="background-image: url({% if rental_heading  %} {{ rental_heading }} {% else  %} https://unsplash.it/780/780?image=1005 {% endif %})"></div>
    <div class="loader-image">{% include '../atoms/loader.html.swig' with {'loader_type': 'yingyang', 'loader_theme': theme} %}</div>
  </a>
  <div class="rental-body">
    <a href="#" class="rental-type h2 pretty-link">
      {% if rental_type  %}
        {{ rental_type }}
      {% else  %}
        Appartement
      {% endif %}
    </a>
    <div class="spacer spacer-xs"></div>
    <a href="#" class="rental-title h1 pretty-link">
      {% if rental_address  %}
        {{ rental_address }}
      {% else  %}
        Av. Collonges 12, 1004 Lausanne
      {% endif %}
    </a>
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
</div>
