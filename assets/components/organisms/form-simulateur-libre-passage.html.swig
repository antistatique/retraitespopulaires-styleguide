---
title: form-simulateur-libre-passage
name: form-simulateur-libre-passage
collection: organisms
notes: |
  ##### Usage : `form-simulateur-libre-passage`
---
<form class="form-simulateur-libre-passage">
  <h3>Vos données personnelles</h3>

  <fieldset class="fieldset-bordered">
    <div class="form-group">
      <label>Date de la situation de prévoyance</label>
      <div class="input-group">
        <input type="text" class="form-control datepicker" value="02/12/2016">
        <span class="input-group-btn no-events">
          <button class="btn btn-default-invert btn-icon" type="button"><i class="retraitespopulaires-icon retraitespopulaires-icon-calendar"></i></button>
        </span>
      </div>
    </div>

    <div class="form-group">
      <label class="d-block">Sexe</label>
      <div class="form-group-inline">
        <div class="input-radio radio-inline">
          <input type="radio" name="taste" value="f">
          <label class="option">Femme</label>
        </div>
        <div class="input-radio radio-inline">
          <input type="radio" name="taste" value="h">
          <label class="option">Homme</label>
        </div>
        <div class="input-radio radio-inline">
          <input type="radio" name="taste" value="other">
          <label class="option">Ne souhaite pas répondre</label>
        </div>
      </div>
    </div>

    <div class="form-group">
      <label class="d-block">Marié(e) ou lié(e) par un partenariat enregistré</label>
      <div class="form-group-inline">
        <div class="input-radio radio-inline">
          <input type="radio" name="etat-civil" value="no">
          <label class="option">Non</label>
        </div>
        <div class="input-radio radio-inline">
          <input type="radio" name="etat-civil" value="yess">
          <label class="option">Oui</label>
        </div>
      </div>
    </div>

    <div class="form-group">
      <label for="pourcentage-rente">Pourcentage souhaité de la rente de vieillesse versée au conjoint (ou partenaire enregistré) survivant</label>

      <div class="input-radio-btn">
        <div class="btn-group" data-toggle="buttons">
          <label class="btn btn-md">
            <input type="radio" name="percents" autocomplete="off"> 0
          </label>
          <label class="btn btn-md">
            <input type="radio" name="percents" autocomplete="off"> 60
          </label>
          <label class="btn btn-md">
            <input type="radio" name="percents" autocomplete="off"> 80
          </label>
          <label class="btn btn-md">
            <input type="radio" name="percents" autocomplete="off"> 100
          </label>
        </div>
        <div class="input-radio-btn-unit">%</div>
      </div>
    </div>
  </fieldset>

  <div class="spacer spacer-sm"></div>
  <h3>Votre apport de libre passage</h3>

  <fieldset class="fieldset-bordered">
    <div class="form-group">
      <label for="montant">Montant</label>
      <input class="form-control form-chf-numeric text-right" id="inputID" type="text" placeholder="CHF"></input>
    </div>
    <div class="form-group">
      <label>Date du versement</label>
      <div class="input-group">
        <input type="text" class="form-control datepicker" value="02/12/2016">
        <span class="input-group-btn no-events">
          <button class="btn btn-default-invert btn-icon" type="button"><i class="retraitespopulaires-icon retraitespopulaires-icon-calendar"></i></button>
        </span>
      </div>
    </div>

    <div class="form-group">
      <label for="pourcentage-rente">Âge terme pour le versement des prestations</label>

      <div class="input-radio-btn">
        <div class="btn-group" data-toggle="buttons">
          <label class="btn btn-sm">
            <input type="radio" name="percents" autocomplete="off"> 59
          </label>
          <label class="btn btn-sm">
            <input type="radio" name="percents" autocomplete="off"> 60
          </label>
          <label class="btn btn-sm">
            <input type="radio" name="percents" autocomplete="off"> 61
          </label>
          <label class="btn btn-sm">
            <input type="radio" name="percents" autocomplete="off"> 62
          </label>
          <label class="btn btn-sm">
            <input type="radio" name="percents" autocomplete="off"> 62
          </label>
          <label class="btn btn-sm">
            <input type="radio" name="percents" autocomplete="off"> 63
          </label>
          <label class="btn btn-sm">
            <input type="radio" name="percents" autocomplete="off"> 64
          </label>
          <label class="btn btn-sm">
            <input type="radio" name="percents" autocomplete="off"> 65
          </label>
          <label class="btn btn-sm">
            <input type="radio" name="percents" autocomplete="off"> 66
          </label>
          <label class="btn btn-sm">
            <input type="radio" name="percents" autocomplete="off"> 67
          </label>
          <label class="btn btn-sm">
            <input type="radio" name="percents" autocomplete="off"> 68
          </label>
          <label class="btn btn-sm">
            <input type="radio" name="percents" autocomplete="off"> 69
          </label>
        </div>
        <div class="input-radio-btn-unit">ans</div>
      </div>
    </div>

  </fieldset>

  <hr />

  <button type="submit" class="btn btn-primary btn-lg pull-right">Calculer</button>
  <div class="clearfix"></div>
</form>
