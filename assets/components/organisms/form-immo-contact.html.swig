---
title: form-immo-contact
name: form-immo-contact
collection: organisms
notes: |
  ##### Usage : `form-immo-contact`
---
<form class="form-offer-bella-vita">
  <fieldset class="fieldset-bordered">
    <div class="form-group">
      <label>Votre prénom</label>
      <div class="input-group">
        <input type="text" id="firstname" name="firstname" value="" size="40" maxlength="128" placeholder="Alain" class="form-text required form-control form-control-immobilier" required="required" aria-required="true">
      </div>
    </div>

    <div class="form-group">
      <label>Votre nom de famille</label>
      <div class="input-group">
        <input type="text" id="lastname" name="lastname" value="" size="40" maxlength="128" placeholder="Rochat" class="form-text required form-control form-control-immobilier" required="required" aria-required="true">
      </div>
    </div>

    <div class="form-group">
      <label>Votre adresse e-mail</label>
      <div class="input-group">
        <input type="email" id="email" name="email" value="" size="50" maxlength="254" placeholder="alain.rochat@retraitespopulaires.ch" class="form-email required form-control form-control-immobilier" required="required" aria-required="true">
      </div>
    </div>

    <div class="form-group">
      <label>Votre adresse</label>
      <div class="input-group">
        <input type="text" id="address" name="address" value="" size="60" maxlength="128" placeholder="Chemin de l'Avenir 1" class="form-text required form-control form-control-immobilier" required="required" aria-required="true">
      </div>
    </div>

    <div class="form-group">
      <label>Votre NPA</label>
      <div class="input-group">
        <input size="10" type="text" id="zip" name="zip" value="" maxlength="128" placeholder="1000" class="form-text required form-control form-control-immobilier" required="required" aria-required="true">
      </div>
    </div>

    <div class="form-group">
      <label>Votre ville</label>
      <div class="input-group">
        <input size="30" type="text" id="city" name="city" value="" maxlength="128" placeholder="Lausanne" class="form-text required form-control form-control-immobilier" required="required" aria-required="true">
      </div>
    </div>

    <div class="form-group">
      <label class="">Votre message</label>
      <div class="input-text">
        <textarea class="form-control form-control-immobilier full-width" name="message" rows="2" cols="30"></textarea>
      </div>
    </div>

  </fieldset>

  <hr />

  <button type="submit" class="btn btn-immobilier btn-lg pull-right">Envoyer</button>
  <div class="clearfix"></div>
</form>
