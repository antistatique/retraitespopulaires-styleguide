---
title: teaser-product
name: teaser-product
collection: molecules
notes: |
  ##### Usage : `teaser-product`
  ##### Options :
  - **title** - String
  - **body** - String
  - **theme** - String
---
<div class="teaser-product teaser-product-{{ theme }} shadow shadow-down">
  <div class="product-heading">
    <div class="product-title h1">
      <div class="product-prefix">RP</div>
      {% if title  %}
        {{ title }}
      {% else  %}
        Rentes immédiate
      {% endif %}
    </div>
  </div>
  <p class="product-body">
  {% if body  %}
    {{ body }}
  {% else  %}
    Profitez de votre retraite! Placez un capital de manière sûre et bénéficiez tout de suite de rentes à vie.</p>
  {% endif %}
</div>
