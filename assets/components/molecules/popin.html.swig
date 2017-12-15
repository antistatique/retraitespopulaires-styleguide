---
title: Popin
name: popin
collection: molecules
notes: |
  Will display a popin at the lower right corner after a few seconds. It can be collapsed.
---
<div class="popin alert alert-dismissible" role="dialog" aria-labelledby="popin-title" aria-describedby="popin-body">
  <div class="popin-header">
    <a href="#popin-content" id="tracking-popin-collapse" class="popin-title-container collapsed" data-toggle="collapse" aria-expanded="false" aria-controls="popin-body">
      <span class="retraitespopulaires-icon retraitespopulaires-icon-angle m-r-1" aria-hidden="true"></span>
      <p class="popin-title m-y-0" id="popin-title">Nous prenons contact avec vous</p>
    </a>
    <p class="popin-title-closed m-y-0 hidden"></p>
    <button id="tracking-popin-close" type="button" class="close" data-dismiss="alert" aria-label="Fermer la fenêtre de dialogue">
      <span aria-hidden="true">&times;</span>
    </button>
  </div>
  <div class="collapse popin-body" id="popin-content">
    <div class="popin-body p-t-1">

      {# Popin content #}
      <form class="rp-popin-form" novalidate="novalidate" data-drupal-selector="rp-popin-form" action="#rp-popin-form" method="post" id="rp-popin-form" accept-charset="UTF-8">
        <div class="form-group">
          <label for="edit-contact">Votre e-mail ou numéro de téléphone*</label>
          <input id="tracking-popin-contact" type="text" name="contact" value="" size="60" maxlength="128" class="form-text form-control">
        </div>
        <div class="row d-flex flex-align-items-end">
          <div class="form-group col-xs-6 col-sm-8">
            <label>Votre code postal (NPA) *</label>
            <input id="tracking-popin-npa" type="text" name="npa" value="" size="60" maxlength="128" placeholder="1000" class="form-text form-control">
          </div>
          <div class="form-group col-xs-6 col-sm-4">
            <input class="btn btn-primary tracking-popin-submit" type="submit" name="op" value="Envoyer">
          </div>
        </div>
      </form>
      {# /Popin content #}

    </div>
  </div>
</div>
