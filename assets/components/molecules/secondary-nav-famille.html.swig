---
title: secondary-nav-famille
name: secondary-nav-famille
collection: molecules
notes: |
  ##### Usage : `secondary-nav-famille`
  ##### Options :
  - **theme** - String
---
<div class="secondary-nav secondary-nav-{{ theme }}">
  <div class="back">
    <a href="retraitespopulaires-styleguide/particuliers" class="retraitespopulaires-icon retraitespopulaires-icon-arrow"></a>
  </div>
  <div class="secondary-nav-content">
    <div class="title h5 text-cocon">Particuliers</div>
    <ul class="links list-no-style list-no-padding">
      <li><a class="pretty-link" href="#">Fortune</a></li>
      
      <li class="active"><a class="pretty-link text-bold" href="retraitespopulaires-styleguide/famille">Famille</a></li>
      <li>
        <ul class="list-no-style list-no-padding">
          <li><a class="pretty-link" href="retraitespopulaires-styleguide/rp-jeune">Préparer l'avenir de ses enfants</a></li>
          <li><a class="pretty-link" href="#">Protéger ses proches</a></li>
          <li><a class="pretty-link" href="#">Succession</a></li>
        </ul>
      </li>
      <li><a class="pretty-link" href="#">Travail</a></li>
      <li><a class="pretty-link" href="#">Retraite</a></li>
      <li><a class="pretty-link" href="#">Logement</a></li>
      <li><a class="pretty-link" href="#">Assuré 2e pilier</a></li>
      <li><a class="pretty-link" href="#">Assuré 3e pilier</a></li>
      <li><a class="pretty-link" href="#">Locataire en place</a></li>
    </ul>
  </div>
</div>