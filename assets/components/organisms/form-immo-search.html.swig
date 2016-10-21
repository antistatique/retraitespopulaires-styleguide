---
title: form-immo-search
name: form-immo-search
collection: organisms
notes: |
  ##### Usage : `form-immo-search`
  ##### Options :
  - **type_immo_search** - <i>String</i> [flats|shops]
---

<form class="form-immo-search">

  <fieldset class="fieldset-no-legend">
    <legend>Recherche d'appartements</legend>
    <div class="row">
      <div class="col-sm-4">
        <div class="form-group">
          <label>Canton</label>
          <select class="form-control form-control-immobilier full-width">
            <option value="vd">Vaud</option>
            <option value="fr">Fribourg</option>
          </select>
        </div>
      </div>
      <div class="col-sm-4">
        <div class="form-group">
          <label>District</label>
          <select class="form-control form-control-immobilier full-width">
            <option value="all">Indifférent</option>
            <option value="fr">...</option>
          </select>
        </div>
      </div>
      <div class="col-sm-4">
        <div class="form-group">
          <label>Commune</label>
          <select class="form-control form-control-immobilier full-width">
            <option value="all">Indifférente</option>
            <option value="fr">...</option>
          </select>
        </div>
      </div>
    </div>
    <div class="row">
      <div class="col-sm-4">
        {% if type_immo_search == 'flats' %}
        <div class="form-group">
          <label class="d-block">Nombre de pièces</label>
          <div class="form-group-inline">
            <div class="input-checkbox checkbox-inline">
              <input type="checkbox" name="nbpieces" value="1">
              <label class="option">1</label>
            </div>
            <div class="input-checkbox checkbox-inline">
              <input type="checkbox" name="nbpieces" value="2">
              <label class="option">2</label>
            </div>
            <div class="input-checkbox checkbox-inline">
              <input type="checkbox" name="nbpieces" value="3">
              <label class="option">3</label>
            </div>
            <div class="input-checkbox checkbox-inline">
              <input type="checkbox" name="nbpieces" value="4">
              <label class="option">4</label>
            </div>
            <div class="input-checkbox checkbox-inline">
              <input type="checkbox" name="nbpieces" value="5">
              <label class="option">5</label>
            </div>
          </div>
        </div>
        {% endif %}
      </div>
      <div class="col-sm-2">
        <div class="form-group">
          <label class="d-block">Loyer maximum</label>
          <div class="input-text">
            <input type="text" name="max_rent" class="form-control form-control-immobilier form-chf-numeric text-right full-width" placeholder="CHF" value="">
          </div>
        </div>
      </div>
      <div class="col-sm-2">
        <div class="form-group">
          <label class="d-block">Surface min.</label>
          <div class="input-text">
            <input type="text" name="max_rent" class="form-control form-control-immobilier text-right full-width form-surface-numeric" placeholder="m²" value="">
          </div>
        </div>
      </div>
      <div class="col-sm-4">
        <div class="form-group d-inline-block">
          <label class="d-block">Disponible dès.</label>
          <select class="form-control form-control-immobilier full-width">
            <option value="01">Janvier</option>
            <option value="02">Février</option>
            <option value="02">...</option>
          </select>
        </div>
        <div class="form-group d-inline-block">
          <select class="form-control form-control-immobilier full-width">
            <option value="2016">2016</option>
            <option value="2017">2017</option>
          </select>
        </div>
      </div>
    </div>

    <div class="spacer spacer-sm"></div>
    <button type="submit" class="btn btn-lg btn-immobilier pull-right">Rechercher</button>
    <div>
  </fieldset>
  <div class="clearfix"></div>
</form>
