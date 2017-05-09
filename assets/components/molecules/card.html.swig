---
title: Card
name: card
wrapper: col-sm-6
collection: molecules
variants:
  default: Standard Card
  img-bg: Image as Background
  card-light: Card Light
  card-justify: Card Justify
notes: |
  - `card` (`card-light`, `card-horizontal`)
  - `card-img-top` > `card-img-bg`/`card-img` (`card-img-top-center` to center small image), fallback to loader (if broken) or icon
  - image side
  - `card-subhead`
  - `card-title`
  - `card-body`
  - `card-footer` (+ `bg-berrylight-gray`) (`card-justify`)
---
{% if variant == 'card-light' -%}
<div class="card card-light">
{% else -%}
<a href="#" class="card">
{% endif -%}
  {% if variant != 'card-light' -%}
  <div class="card-img-top">
    {% if variant == 'img-bg' -%}
    <div class="card-img-bg" style="background-image: url('https://unsplash.it/780/780?image=1005');"></div>
    {% else -%}
    <img class="card-img" src="https://unsplash.it/780/380?image=1005" alt="card image">
    {% endif -%}
    <div class="loader-image">
    {%- include '../atoms/loader.html.swig' with {'loader_type': 'yingyang'} %}
    </div>
  </div>
  {% endif -%}
  <div class="card-body">
    {% if variant != 'card-light' -%}
    <p class="card-subhead">Subheading</p>
    {% endif -%}
    <h3 class="card-title h1">Lorem Ipsum Dolor Sit Amet</h3>
    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Unde debitis, consequuntur dolor neque eveniet velit.</p>
  </div>
  {%- if variant == 'card-light' %}
  <div class="card-footer bg-berrylight-gray">
    Footer here
  </div>
  {% elseif variant == 'card-justify' %}
  <div class="card-footer card-justify">
    <span>Décembre 2015</span>
    <span>Bella Vita</span>
  </div>
  {%- endif %}
{% if variant == 'card-light' -%}
</div>
{% else -%}
</a>
{% endif -%}
