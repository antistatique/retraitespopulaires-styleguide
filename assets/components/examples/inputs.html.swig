---
title: inputs
name: inputs
collection: examples
styleguide: true
layout: examples.html.swig
---
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

    {% include '../atoms/input-radio.html.swig' %}
    {% include '../atoms/input-checkbox.html.swig' %}
    {% include '../atoms/input-select.html.swig' %}
    {% include '../atoms/input-datepicker.html.swig' %}
    {% include '../atoms/input-radio-btn.html.swig' %}
    {% include '../atoms/input-textarea.html.swig' %}

</div>
</div>
