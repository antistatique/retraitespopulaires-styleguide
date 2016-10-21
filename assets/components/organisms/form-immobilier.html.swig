---
title: form-immobilier
name: form-immobilier
collection: organisms
notes: |
  ##### Usage : `form-immobilier`
---
<form class="form-immobilier">

  <fieldset class="fieldset-bordered">
    <div class="row">
      <div class="col-sm-4">
        <div class="form-group">
          <label>Canton</label>
          <select class="form-control full-width">
            <option value="vd">Vaud</option>
            <option value="fr">Fribourg</option>
          </select>
        </div>
      </div>
      <div class="col-sm-4">
        <div class="form-group">
          <label>District</label>
          <select class="form-control full-width">
            <option value="all">Indifférent</option>
            <option value="fr">...</option>
          </select>
        </div>
      </div>
      <div class="col-sm-4">
        <div class="form-group">
          <label>Commune</label>
          <select class="form-control full-width">
            <option value="all">Indifférente</option>
            <option value="fr">...</option>
          </select>
        </div>
      </div>
    </div>
    <div class="spacer spacer-xs">

    </div>
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
    <div class="form-group">
      <label class="d-block">Loyer maximum</label>
      <div class="input-text">
        <input type="text" name="max_rent" class="form-control" value="">
      </div>
    </div>



    <div class="form-group">
      <label class="d-block">Disponible dès</label>

      <div class="row">
        <div class="col-sm-3">
          <div class="form-group">
            <label>Mois</label>
            <select class="form-control full-width">
              <option value="01">Janvier</option>
              <option value="02">Février</option>
              <option value="02">...</option>
            </select>
          </div>
        </div>
        <div class="col-sm-3">
          <div class="form-group">
            <label>Année</label>
            <select class="form-control full-width">
              <option value="2016">2016</option>
              <option value="2017">2017</option>
            </select>
          </div>
        </div>
      </div>
    </div>

  </fieldset>

  <hr />

  <button type="submit" class="btn btn-primary btn-immobilier btn-lg pull-right">Rechercher</button>
  <div class="clearfix"></div>
</form>
