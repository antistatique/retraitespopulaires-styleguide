---
title: Icon Text
name: icon-text
collection: atoms
variants:
  back: Back Icon
notes: |
  Can be wrapped in `.theme-[theme]` to change look.
---
{% if variant == 'back' -%}
<div class="icon-text" style="max-width: 200px;">
  <a href="#0" class="retraitespopulaires-icon retraitespopulaires-icon-arrow-left no-underline text-primary"></a>
  <div class="icon-text-txt">
    <a href="#0" class="pretty-link text-primary">Retour aux questions et réponses</a>
  </div>
</div>
{%- else -%}
<a href="#0" class="icon-text icon-text-center" style="max-width: 200px;">
  <span class="retraitespopulaires-icon retraitespopulaires-icon-collectivites retraitespopulaires-icon-3x"></span>
  <h4 class="icon-text-txt text-secondary">Collectivités publiques</h4>
</a>
{%- endif -%}
