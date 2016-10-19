---
title: form-job-contactinfo
name: form-job-contactinfo
collection: organisms
notes: |
  ##### Usage : `form-job-contactinfo`
---
<form class="form-job-contactinfo">
  <h3>Informations personnelles</h3>
  <fieldset class="fieldset-bordered">
    <div class="form-group">
      <label>Votre titre</label>
      <select name="title" class="form-control">
        <option value="h">Monsieur</option>
        <option value="f">Madame</option>
        <option value="...">...</option>
      </select>
    </div>
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
    <div class="form-group">
      <label class="">Votre lieu d'origine</label>
      <div class="input-text">
        <input type="text" size="30" name="firstname" class="form-control" placeholder="St-Saphorin" value="">
      </div>
    </div>
    <div class="form-group">
      <label>Votre nationalité</label>
      <select name="nationnality" class="form-control">
        <option value="swiss">Suisse</option>
        <option value="france">France</option>
        <option value="...">...</option>
      </select>
    </div>
    <div class="form-group">
      <label>Votre état civil</label>
      <select name="civility" class="form-control">
        <option value="single">Célibataire</option>
        <option value="married">Marié</option>
        <option value="...">...</option>
      </select>
    </div>
    <div class="form-group disabled">
      <label class="">Votre adresse e-mail</label>
      <div class="input-text">
        <input type="text" size="50" name="mail" class="form-control" value="john.doe@retraitespopulaires.ch" disabled>
      </div>
    </div>
  </fieldset>

  <h3>Vos coordonnées</h3>
  <fieldset class="fieldset-bordered">
    <div class="form-group">
      <label class="">Votre rue</label>
      <div class="input-text">
        <input type="text" size="60" name="address" class="form-control" placeholder="Chemin des Pinçons 4" value="">
      </div>
    </div>
    <div class="form-group">
      <label class="">Complément</label>
      <div class="input-text">
        <input type="text" size="60" name="address_extra" class="form-control" value="">
      </div>
    </div>
    <div class="form-group">
      <label class="">Votre code postal</label>
      <div class="input-text">
        <input type="text" size="10" name="zip" placeholder="1002" class="form-control" value="">
      </div>
    </div>
    <div class="form-group">
      <label class="">Votre ville</label>
      <div class="input-text">
        <input type="text" size="30" name="city" placeholder="Lausanne" class="form-control" value="">
      </div>
    </div>
  </fieldset>

  <hr />

  <button type="submit" class="btn btn-primary btn-lg pull-right">Valider</button>
  <div class="clearfix"></div>
</form>
