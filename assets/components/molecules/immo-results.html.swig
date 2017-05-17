---
title: Immo Results
name: immo-results
collection: molecules
notes: |
  Can be wrapped in `.theme-[theme]` to change look.
---
<div class="immo-results">
  <div class="immo-result pull-left">Résultats: <span class="text-bold">105</span> objet(s) trouvé(s)</div>
  <div class="immo-results-sorts pull-right">
    <div class="d-inline-block">Tri:</div>
    <ul class="d-inline-block list-no-style list-no-padding list-inline">
      <li> <a class="pretty-link text-{{ immo_result_theme|default('immobilier') }}" href="#"><span class="text-small">►</span> Loyer</a> </li>
      <li> <a class="pretty-link text-{{ immo_result_theme|default('immobilier') }}" href="#"><span class="text-small">▼</span> Pièces</a> </li>
      <li> <a class="pretty-link text-{{ immo_result_theme|default('immobilier') }}" href="#"><span class="text-small">▲</span> Surface</a> </li>
    </ul>
  </div>
</div>
