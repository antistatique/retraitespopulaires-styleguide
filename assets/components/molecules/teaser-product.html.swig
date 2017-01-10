---
title: teaser-product
name: teaser-product
collection: molecules
notes: |
  ##### Usage : `teaser-product`
  ##### Options :
  - **teaser_product_title** - <i>String</i>
  - **teaser_product_body** - <i>String</i>
  - **teaser_product_theme** - <i>String</i> - <b>teaser-product-['assurance'|'prevoyance'|'immobilier'|'hypotheque'|'institutionnel'|'profelia'|'cpev'|'cip']</b>
---
<a href="#" class="teaser teaser-{{ teaser_product_theme }} teaser-fullclick teaser-product teaser-product-{{ teaser_product_theme }} shadow shadow-down">
  <div class="product-heading">
    <div class="product-title h1">
      <div class="product-prefix">RP</div>
      {{ teaser_product_title|default('Rentes immédiate') }}
    </div>
  </div>
  <p class="product-body">
    {{ teaser_product_body|default('Profitez de votre retraite! Placez un capital de manière sûre et bénéficiez tout de suite de rentes à vie.') }}
  </p>
</a>
