---
title: inputs
collection: docs
styleguide: true
---

<div class="form-group readonly">
  <label>Champ Read-only</label>
  <input type="text" class="form-control" value="Tu peux me lire mais tu ne peux pas m'éditer !" readonly></input>
</div>

<div class="form-group">
  <label>Champ avec label</label>
  <input type="text" class="form-control" placeholder="Quelque chose dans l'air..."></input>
</div>

<div class="form-group error">
  <label>Validation PAS OK</label>
  <input type="text" class="form-control" placeholder="Houston… Nous avons un problème! Houston?"></input>
  <div class="input-error-desc">Voici comment résoudre ton problème.</div>
</div>

<div class="form-group">
  <label>Groupe</label>
  <div class="input-group">
    <input type="text" class="form-control" placeholder="Search for...">
    <span class="input-group-btn">
      <button class="btn btn-default" type="button">Rechercher</button>
    </span>
  </div>
</div>

<div class="form-group readonly">
  <label>Groupe - Read-only</label>
  <div class="input-group">
    <input type="text" class="form-control" placeholder="Tu peux me lire mais tu ne peux pas m'éditer !" readonly>
    <span class="input-group-btn">
      <button class="btn btn-default" type="button">Rechercher</button>
    </span>
  </div>
</div>

<div class="form-group">
  <label>Groupe - Icône</label>
  <div class="input-group">
    <input type="text" class="form-control" placeholder="Chercher un produit, un document, un contact, ...">
    <span class="input-group-btn">
      <button class="btn btn-default btn-icon" type="button"><i class="retraitespopulaires-icon retraitespopulaires-icon-search"></i></button>
    </span>
  </div>
</div>

<div class="form-group">
  <label class="label-hidden"></label>
  <div class="input-group">
    <input type="text" class="form-control" placeholder="Chercher un produit, un document, un contact, ..." data-title="Champ avec Label dynamique">
    <span class="input-group-btn">
      <button class="btn btn-default btn-icon" type="button"><i class="retraitespopulaires-icon retraitespopulaires-icon-search"></i></button>
    </span>
  </div>
</div>
