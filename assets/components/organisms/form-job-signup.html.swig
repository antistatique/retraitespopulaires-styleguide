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
        <input type="text" name="lastname" class="form-control" placeholder="John" value="">
      </div>
    </div>
    <div class="form-group">
      <label class="">Votre prénom</label>
      <div class="input-text">
        <input type="text" name="firstname" class="form-control" placeholder="Doe" value="">
      </div>
    </div>
    <div class="form-group">
      <label class="">Votre date de naissance</label>
      <div class="input-text">
        <input type="text" name="birthdate" class="form-control" placeholder="24/12/2016" value="">
      </div>
    </div>
  </fieldset>

  <h3>Informations de connexion</h3>
  <fieldset class="fieldset-bordered">
    <div class="form-group">
      <label class="">Votre addresse e-mail</label>
      <div class="input-text">
        <input type="text" name="mail" class="form-control" placeholder="john.doe@retraites-populaires.ch" value="">
      </div>
    </div>
    <div class="form-group">
      <label class="">Votre Mot de passe</label>
      <div class="input-text">
        <input type="password" name="password" class="form-control" value="">
      </div>
    </div>
    <div class="form-group">
      <label class="">Confirmer votre mot de passe</label>
      <div class="input-text">
        <input type="password" name="password_confirmation" class="form-control" value="">
      </div>
    </div>
  </fieldset>

  <hr />

  <button type="submit" class="btn btn-primary btn-lg pull-right">Valider</button>
  <div class="clearfix"></div>
</form>
