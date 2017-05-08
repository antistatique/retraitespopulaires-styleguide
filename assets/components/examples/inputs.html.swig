---
title: inputs
name: inputs
collection: examples
styleguide: true
layout: examples.html.swig
---

<div class="row">
  <div class="col-xs-6 col-xs-offet-3">
    <label>Confirmation de réussit d'un formulaire</label>
    {% include '../atoms/well.html.swig' with {'well_status': 'success'} %}
    <div class="spacer spacer-sm"></div>

    <label>Affichage des erreurs d'un formulaire</label>
    {% include '../atoms/well.html.swig' with {'well_status': 'danger'} %}
  </div>
</div>

<div class="row">
  <div class="col-xs-12">
    <div class="form-group readonly">
      <label>Champ lecture seule</label>
      <input type="text" class="form-control full-width" value="Tu peux me lire mais tu ne peux pas m'éditer !" readonly></input>
      <p class="help-block">Equivaut au <strong>pourcentage d'activité</strong> actuel ou au pourcentage d'activité antiérieur maintenu par des cotisations complémentaires.</p>
    </div>

    <div class="form-group">
      <label>Champ avec label</label>
      <input type="text" class="form-control full-width" placeholder="Quelque chose dans l'air..."></input>
    </div>

    <div class="form-group error">
      <label>Validation PAS OK</label>
      <input type="text" class="form-control full-width" placeholder="Houston… Nous avons un problème! Houston?"></input>
      <div class="input-error-desc">Voici comment résoudre ton problème.</div>
    </div>

    <div class="form-group">
      <label>Groupe</label>
      <div class="input-group full-width">
        <input type="text" class="form-control full-width" placeholder="Rechercher des documents, articles, ...">
        <span class="input-group-btn">
          <button class="btn btn-default" type="button">Rechercher</button>
        </span>
      </div>
    </div>

    <div class="form-group readonly">
      <label>Groupe - lecture seule</label>
      <div class="input-group full-width">
        <input type="text" class="form-control full-width" placeholder="Tu peux me lire mais tu ne peux pas m'éditer !" readonly>
        <span class="input-group-btn">
          <button class="btn btn-default" type="button">Rechercher</button>
        </span>
      </div>
    </div>

    <div class="form-group">
      <label class="d-block">Formatage de monnaie CHF</label>
      <div class="input-text">
        <input type="text" name="max_rent" class="form-control form-chf-numeric text-right" placeholder="CHF" value="">
      </div>
    </div>

    <div class="form-group">
      <label class="d-block">Formatage numérique</label>
      <div class="input-text">
        <input type="text" name="max_rent" class="form-control text-right form-surface-numeric" placeholder="m²" value="">
      </div>
    </div>

    <div class="form-group">
      <label for="montant">Formatage de pourcentage</label>
      <input class="form-control form-percent-numeric text-right" id="inputID" type="text" placeholder="%"></input>
    </div>

    {% include '../atoms/input-radio.html.swig' %}
    <div class="form-group">
      <div class="form-group-inline">
        <div class="input-checkbox checkbox-inline">
          <input type="checkbox" name="choice" value="pistache">
          <label class="option">Pistache</label>
        </div>
        <div class="input-checkbox checkbox-inline">
          <input type="checkbox" name="choice" value="menthe-fraiche">
          <label class="option">Menthe fraîche</label>
        </div>
        <div class="input-checkbox checkbox-inline">
          <input type="checkbox" name="choice" value="chocolat">
          <label class="option">chocolat</label>
        </div>
      </div>
    </div>

    {% include '../atoms/input-checkbox.html.swig' %}
    <div class="form-group">
      <div class="form-group-inline">
        <div class="input-radio radio-inline">
          <input type="radio" name="choice" value="meringue-creme-double">
          <label class="option">Meringue crème double</label>
        </div>
        <div class="input-radio radio-inline">
          <input type="radio" name="choice" value="miel">
          <label class="option">Miel</label>
        </div>
      </div>
    </div>

    {% include '../atoms/input-select.html.swig' %}
    {% include '../atoms/input-datepicker.html.swig' %}
    <div class="input-group">
      <input aria-label="Saisissez la date au format (JJ/MM/AAAA)" type="text" class="form-control datepicker" value="02/12/2016">
      <span class="input-group-btn no-events">
        <button class="btn btn-default-invert btn-icon" type="button" aria-label="Choisir la date"><i class="retraitespopulaires-icon retraitespopulaires-icon-calendar"></i></button>
      </span>
    </div>

    {% include '../atoms/input-radio-btn.html.swig' %}
    {% include '../atoms/input-textarea.html.swig' %}
    {% include '../atoms/input-file.html.swig' %}

    <form method="post" action="#" enctype="multipart/form-data">
      <div class="form-group form-file">
        <div class="label">Vos documents</div>
        <div class="form-file-handler btn btn-lg btn-primary">
          <label for="files">Télécharger vos fichiers</label>
          <input name="files[]" id="filesToUpload" type="file" multiple="" />
        </div>
      </div>
    </form>

</div>
</div>
