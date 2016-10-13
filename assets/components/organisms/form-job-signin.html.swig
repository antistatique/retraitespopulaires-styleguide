---
title: form-job-signin
name: form-job-signin
collection: organisms
notes: |
  ##### Usage : `form-job-signin`
---
<form class="form-job-signin">
  <h3>Informations de connexion</h3>
  <fieldset class="fieldset-bordered">
    <div class="form-group">
      <label class="">Votre addresse e-mail</label>
      <div class="input-text">
        <input type="text" size="50" name="mail" class="form-control" placeholder="john.doe@retraites-populaires.ch" value="">
      </div>
    </div>
    <div class="form-group">
      <label class="">Votre mot de passe</label>
      <div class="input-text">
        <input type="password" size="30" name="password" class="form-control" value="">
      </div>
    </div>
  </fieldset>

  <hr />
  <button type="submit" class="btn btn-primary btn-lg pull-right">Se connecter</button>
  <a href="#" class="btn pretty-link pull-right">Mot de passe oublié ?</a>
  <div class="clearfix"></div>
</form>
