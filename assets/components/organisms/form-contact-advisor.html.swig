---
title: form-contact-advisor
name: form-contact-advisor
collection: organisms
notes: |
  ##### Usage : `form-contact-advisor`
---
<form class="form-contact-advisor">
  <h3>Vos informations</h3>
  <fieldset class="fieldset-bordered">

    <div class="row">
      <div class="col-xs-12 col-md-6">
        <div class="form-group">
          <label>Votre prénom</label>
          <div class="input-group">
            <input type="text" id="firstname" name="firstname" value="" size="40" maxlength="128" placeholder="John" class="form-text required form-control" required="required" aria-required="true">
          </div>
        </div>
      </div>
      <div class="col-xs-12 col-md-6">
        <div class="form-group">
          <label>Votre nom de famille</label>
          <div class="input-group">
            <input type="text" id="lastname" name="lastname" value="" size="40" maxlength="128" placeholder="Doe" class="form-text required form-control" required="required" aria-required="true">
          </div>
        </div>
      </div>
    </div>

    <div class="form-group">
      <label>Votre E-mail</label>
      <div class="input-group">
        <input type="email" id="email" name="email" value="" size="60" maxlength="254" placeholder="john.doe@retraitespopulaires.ch" class="form-email required form-control" required="required" aria-required="true">
      </div>
    </div>

    <div class="form-group">
      <label class="">Votre date de naissance <span class="text-small text-muted">(jj/mm/aaaa)</span></label>
      <div class="input-text">
        <input type="text" size="10" name="birthdate" class="form-control" placeholder="24/12/2016" value="">
      </div>
    </div>

    <div class="form-group">
      <label>Votre addresse</label>
      <div class="input-group">
        <input type="text" id="address" name="address" value="" size="60" maxlength="128" placeholder="Chemin de l'Avenir 1" class="form-text form-control">
      </div>
    </div>

    <div class="row">
      <div class="col-xs-12 col-md-6">
        <div class="form-group">
          <label>Votre code postal (NPA)</label>
          <div class="input-group">
            <input size="10" type="text" id="zip" name="zip" value="" maxlength="128" placeholder="1000" class="form-text form-control">
          </div>
        </div>
      </div>
      <div class="col-xs-12 col-md-6">
        <div class="form-group">
          <label>Votre ville</label>
          <div class="input-group">
            <input size="30" type="text" id="city" name="city" value="" maxlength="128" placeholder="Lausanne" class="form-text form-control">
          </div>
        </div>
      </div>
    </div>

    <div class="form-group">
      <label>Votre N° de téléphone</label>
      <div class="input-group">
        <input type="text" id="phone" name="phone" value="" size="20" maxlength="128" placeholder="079 123 45 67" class="form-text required form-control" required="required" aria-required="true">
      </div>
    </div>
  </fieldset>

  <h3>Votre demande</h3>
  <fieldset class="fieldset-bordered">
    <div class="form-group">
      <label>Sujet de votre demande</label>
      <div class="input-group">
        <input type="text" id="subject" name="subject" value="" size="60" placeholder="" class="form-text required form-control" required="required" aria-required="true">
      </div>
    </div>
    <div class="form-group">
      <label>Votre message</label>
      <div class="input-group">
        <textarea class="required form-control" id="message" name="message" rows="8" cols="60"></textarea>
      </div>
    </div>
  </fieldset>

  <hr />

  <button type="submit" class="btn btn-primary btn-lg pull-right">Contacter</button>
  <div class="clearfix"></div>
</form>
