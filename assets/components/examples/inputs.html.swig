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

    {% include '../atoms/input-radio.html.swig' %}
    {% include '../atoms/input-checkbox.html.swig' %}
    {% include '../atoms/input-select.html.swig' %}
    {% include '../atoms/input-datepicker.html.swig' %}

</div>
</div>
