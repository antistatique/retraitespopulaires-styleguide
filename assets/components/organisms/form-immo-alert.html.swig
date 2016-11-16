---
title: form-immo-alert
name: form-immo-alert
collection: organisms
notes: |
  ##### Usage : `form-immo-alert`
---
<div class="form-immo-alert">
  <div class="row">
    <div class="col-md-5 col-md-offset-1">
      <h2>Créer une alerte e-mail</h2>
      <div class="spacer spacer-sm"></div>
      <p>Pendant la durée de votre choix, vous recevrez les nouveaux objets correspondant à vos critères de recherche.</p>
    </div>
    <div class="col-md-5">
      <form>
        <div class="form-group">
          <div class="input-group full-width">
            <label for="interval">Durée</label>
            <select class="form-control form-control-immobilier" name="interval">
              <option value="1">1 mois</option>
              <option value="2">2 mois</option>
              <option value="3" selected>3 mois</option>
            </select>
          </div>
        </div>
        <div class="form-group">
          <label for="interval">Votre e-mail</label>
          <div class="input-group full-width">
            <input type="text" class="form-control form-control-immobilier full-width" placeholder="Ex: aline.rochat@retraitespopulaires.ch">
            <span class="input-group-btn">
              <button class="btn btn-immobilier" type="button">Inscription</button>
            </span>
          </div>
        </div>
      </form>
    </div>
  </div>
</div>
