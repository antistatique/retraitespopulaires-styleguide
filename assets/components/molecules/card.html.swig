---
title: Card
name: card
wrapper: col-sm-6
collection: molecules
variants:
  default: Standard Card
  img-bg: Image as Background
  card-icon: Icon
  card-light: Card Light
  card-justify: Card Justify
  card-horizontal: Card Horizontal
  card-logo: Card Logo
notes: |
  - `card` (`card-light`, `card-horizontal`): modifiers to have a light border or horizontal layout
  - `card-img-top` > `card-img-bg`/`card-img` (`card-img-top-center` to center small image), fallback to loader (if broken) or icon
  - `card-subhead`: creates a simple subtitle with gray color
  - `card-title`: can be whatever size ou want, with classes or semantically
  - `card-body` (`card-justify`): can hold rows and cols, all the content
  - `card-footer` (`card-justify`): add modifiers to change color, or justify (flex) content
  - `card-white` or `card-berrylight-gray` to set background colors
  - `card-sm` to have a small card of maximum 150px width
  - `card-no-border` to remove borders
  - `card-no-shadow` to remove shadow
  - `card-separator` to a `<hr>` to add a separator
  - `card-hover` to hover hover effects on a `div.card`
---
{% if variant == 'card-light' or variant == 'card-horizontal' -%}
<div class="card card-white {{ variant }}">
{% else -%}
<a href="#" class="card card-white">
{%- endif -%}
  {%- if variant != 'card-light' -%}
  {%- if variant != 'card-icon' %}
  <div class="card-img-top {% if variant == 'card-logo' -%}card-img-top-center card-berrylight-gray{% endif -%}">
    {% if variant == 'img-bg' or variant == 'card-horizontal' -%}
    <div class="card-img-bg" style="background-image: url('https://unsplash.it/512/512?image=1005');"></div>
    {% elseif variant == 'card-logo' %}
    <img class="card-img" src="https://3.bp.blogspot.com/-AJNG3A2-QIw/VjTFNFpJjsI/AAAAAAAAACQ/3lkytAva6oY/s600-c/NoImage.png" alt="card logo">
    {% else -%}
    <img class="card-img" src="https://unsplash.it/780/380?image=1005" alt="card image">
    {% endif -%}
    <div class="loader-image">{%- include '../atoms/loader.html.swig' with {'loader_type': 'yingyang'} -%}</div>
  </div>
  {%- else %}
  <div class="card-img-top">
    <span class="retraitespopulaires-icon retraitespopulaires-icon-5x retraitespopulaires-icon-contact-us-borderless" aria-hidden="true"></span>
  </div>
  {% endif -%}
  {% endif -%}
  <div class="card-body">
    {% if variant != 'card-light' -%}
    <p class="card-subhead">Subheading</p>
    {% endif -%}
    <h3 class="card-title h1">Lorem Ipsum Dolor Sit Amet</h3>
    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Unde debitis, consequuntur dolor neque eveniet velit.</p>
  </div>
  {%- if variant == 'card-light' %}
  <div class="card-footer card-berrylight-gray">
    Footer here
  </div>
  {% elseif variant == 'card-justify' %}
  <div class="card-footer card-justify">
    <span>Décembre 2015</span>
    <span>Bella Vita</span>
  </div>
  {%- endif %}
{% if variant == 'card-light' or variant == 'card-horizontal' -%}
</div>
{% else -%}
</a>
{% endif -%}
