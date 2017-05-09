---
title: icon-text
name: icon-text
collection: atoms
variants:
  back: Back Icon
---
{% if variant == 'back' -%}
<div class="icon-text" style="max-width: 200px;">
  <a href="#0" class="retraitespopulaires-icon retraitespopulaires-icon-arrow-left no-underline text-{{icon_text_theme}}"></a>
  <div class="icon-text-txt">
    <a href="/contact/questions-reponses" class="pretty-link text-{{icon_text_theme}}">Retour aux questions et réponses</a>
  </div>
</div>
{%- else -%}
<a href="#" class="icon-text icon-text-center" style="max-width: 200px;">
  <span class="retraitespopulaires-icon retraitespopulaires-icon-collectivites retraitespopulaires-icon-3x"></span>
  <h4 class="icon-text-txt text-secondary">Collectivités publiques</h4>
</a>
{%- endif -%}
