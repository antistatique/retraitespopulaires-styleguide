---
title: form-job-signup
name: form-job-signup
collection: organisms
notes: |
  ##### Usage : `form-job-signup`
---
<form class="form-job-signup">
  <h3>Informations personnelles</h3>
  <fieldset class="fieldset-bordered">
    <div class="form-group">
      <label class="">Votre nom</label>
      <div class="input-text">
        <input type="text" size="40" name="lastname" class="form-control" placeholder="John" value="">
      </div>
    </div>
    <div class="form-group">
      <label class="">Votre prénom</label>
      <div class="input-text">
        <input type="text" size="40" name="firstname" class="form-control" placeholder="Doe" value="">
      </div>
    </div>
    <div class="form-group">
      <label class="">Votre date de naissance <span class="text-small text-muted">(jj/mm/aaaa)</span></label>
      <div class="input-text">
        <input type="text" size="10" name="birthdate" class="form-control" placeholder="24/12/2016" value="">
      </div>
    </div>
  </fieldset>

  <h3>Informations de connexion</h3>
  <fieldset class="fieldset-bordered">
    <div class="form-group error">
      <label class="">Votre addresse e-mail</label>
      <div class="input-text">
        <input type="text" size="50" name="mail" class="form-control" placeholder="john.doe@retraites-populaires.ch" value="">
        <div class="input-error-desc">Votre addresse e-mail semble invalide.</div>
      </div>
    </div>
    <div class="form-group">
      <label class="">Votre mot de passe</label>
      <div class="input-text">
        <input type="password" size="30" name="password" class="form-control" value="">
      </div>
    </div>
    <div class="form-group">
      <label class="">Confirmer votre mot de passe</label>
      <div class="input-text">
        <input type="password" size="30" name="password_confirmation" class="form-control" value="">
      </div>
    </div>
  </fieldset>

  <hr />

  <button type="submit" class="btn btn-primary btn-lg pull-right">Valider</button>
  <div class="clearfix"></div>
</form>
