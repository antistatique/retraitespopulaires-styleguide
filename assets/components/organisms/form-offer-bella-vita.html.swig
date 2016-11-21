---
title: form-offer-bella-vita
name: form-offer-bella-vita
collection: organisms
notes: |
  ##### Usage : `form-offer-bella-vita`
---
<form class="form-offer-bella-vita">
  <h3>Participer aux tirage au sort</h3>

  <fieldset class="fieldset-bordered">
    <div class="form-group">
      <label>Votre prénom</label>
      <div class="input-group">
        <input type="text" id="firstname" name="firstname" value="" size="40" maxlength="128" placeholder="Alain" class="form-text required form-control" required="required" aria-required="true">
      </div>
    </div>

    <div class="form-group">
      <label>Votre nom de famille</label>
      <div class="input-group">
        <input type="text" id="lastname" name="lastname" value="" size="40" maxlength="128" placeholder="Rochat" class="form-text required form-control" required="required" aria-required="true">
      </div>
    </div>

    <div class="form-group">
      <label>Votre E-mail</label>
      <div class="input-group">
        <input type="email" id="email" name="email" value="" size="60" maxlength="254" placeholder="alain.rochat@retraitespopulaires.ch" class="form-email required form-control" required="required" aria-required="true">
      </div>
    </div>

    <div class="form-group">
      <label>Votre addresse</label>
      <div class="input-group">
        <input type="text" id="address" name="address" value="" size="60" maxlength="128" placeholder="Chemin de l'Avenir 1" class="form-text required form-control" required="required" aria-required="true">
      </div>
    </div>

    <div class="form-group">
      <label>Votre NPA</label>
      <div class="input-group">
        <input size="10" type="text" id="zip" name="zip" value="" maxlength="128" placeholder="1000" class="form-text required form-control" required="required" aria-required="true">
      </div>
    </div>

    <div class="form-group">
      <label>Votre localité</label>
      <div class="input-group">
        <input size="30" type="text" id="city" name="city" value="" maxlength="128" placeholder="Lausanne" class="form-text required form-control" required="required" aria-required="true">
      </div>
    </div>

  </fieldset>

  <hr />

  <button type="submit" class="btn btn-primary btn-lg pull-right">Je participe</button>
  <div class="clearfix"></div>
</form>
