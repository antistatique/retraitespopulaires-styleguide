---
title: collapse
name: collapse
collection: molecules
notes: |
  ##### Usage : `collapse`
  - **collapse_theme** - <i>String</i> - <b>['primary'|'assurance'|'prevoyance'|'immobilier'|'hypotheque'|'institutionnel'|'profelia'|'cpev'|'cip']</b>
---
<div class="collapse-wrapper">
  <div class="collapse-title">
    <h5 class="inline-block">
      <a class="text-{{ collapse_theme|default('primary') }}" href="#">Assurance vie</a>
    </h5>
    <a class="inline-block pull-right collapse-button" role="button" data-toggle="collapse" href="#assurance-vie" aria-expanded="true" aria-controls="assurance-vie" aria-label="Cliquez pour dérouler le contenu de la section assurance-vie.">
      <i class="retraitespopulaires-icon retraitespopulaires-icon-angle"></i>
    </a>
    <div class="clearfix"></div>
  </div>
  <div id="assurance-vie" class="collapse-body collapse in">
    <ul class="unordered-list">
      <li>Ut efficitur mattis</li>
      <li>Ut efficitur mattis</li>
      <li>Ut efficitur mattis</li>
      <li>Ut efficitur mattis</li>
      <li>Ut efficitur mattis</li>
      <li>Ut efficitur mattis</li>
      <li>Ut efficitur mattis</li>
      <li>Ut efficitur mattis</li>
      <li>Ut efficitur mattis</li>
    </ul>
  </div>
</div>
