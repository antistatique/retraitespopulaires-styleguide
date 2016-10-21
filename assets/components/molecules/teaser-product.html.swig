---
title: teaser-product
name: teaser-product
collection: molecules
notes: |
  ##### Usage : `teaser-product`
  ##### Options :
  - **title** - <i>String</i>
  - **body** - <i>String</i>
  - **theme** - <i>String</i> - <b>teaser-product-['assurance'|'prevoyance'|'immobilier'|'hypotheque'|'institutionnel'|'profelia'|'cpev'|'cip']</b>
---
<a href="#" class="teaser teaser-{{ theme }} teaser-fullclick teaser-product teaser-product-{{ theme }} shadow shadow-down">
  <div class="product-heading">
    <div class="product-title h1">
      <div class="product-prefix">RP</div>
      {{ title|default('Rentes immédiate') }}
    </div>
  </div>
  <p class="product-body">
    {{ body|default('Profitez de votre retraite! Placez un capital de manière sûre et bénéficiez tout de suite de rentes à vie.') }}
  </p>
</a>
