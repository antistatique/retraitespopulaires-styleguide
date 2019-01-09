---
title: Popin
name: popin
collection: molecules
notes: |
  This component is visible into the [basic page](/basic-page).
---
<div class="popin-container popin-container-collapse" id="popins">
  <div class="popin popin-collapse-desktop hidden-xs" role="dialog">
    <div class="popin-header">
      <a class="popin-icon" data-toggle="popins-collapse">
        <span class="retraitespopulaires-icon retraitespopulaires-icon-arrow-left" aria-hidden="true"></span>
      </a>
    </div>
  </div>
  <div id="popin-1" class="panel popin" role="dialog" aria-labelledby="popin-title" aria-describedby="popin-body">
    <div class="panel-heading popin-header">
      <a class="popin-collapse-show-mobile" data-toggle="popin-collapse-show-mobile" data-target="#popin-collapse-hide-mobile-1">
        <span class="retraitespopulaires-icon retraitespopulaires-icon-external-link" aria-hidden="true"></span>
      </a>
      <a href="#" id="popin-title-1" class="popin-title-container" aria-controls="popin-body">
        <span class="retraitespopulaires-icon retraitespopulaires-icon-external-link popin-icon" aria-hidden="true"></span>
        <p class="popin-title m-y-0" id="popin-title">Accéder à la page principale</p>
      </a>
    </div>
  </div>
  <div class="popin popin-collapse-hide-mobile hidden" role="dialog" id="popin-collapse-hide-mobile-1">
    <div class="popin-header">
      <a data-toggle="popin-collapse-hide-mobile">
        <span class="retraitespopulaires-icon retraitespopulaires-icon-arrow-down" aria-hidden="true"></span>
      </a>
    </div>
  </div>
  <div id="popin-2" class="panel popin" role="dialog" aria-labelledby="popin-title" aria-describedby="popin-body">
    <div class="panel-heading popin-header">
      <a class="popin-collapse-show-mobile" data-toggle="popin-collapse-show-mobile" data-target="#popin-collapse-hide-mobile-2">
        <span class="retraitespopulaires-icon retraitespopulaires-icon-phone" aria-hidden="true"></span>
      </a>
      <a href="#" id="popin-title-2" class="popin-title-container" aria-controls="popin-body">
        <span class="retraitespopulaires-icon retraitespopulaires-icon-phone popin-icon" aria-hidden="true"></span>
        <p class="popin-title m-y-0" id="popin-title">Appelez-nous</p>
      </a>
    </div>
  </div>
  <div class="popin popin-collapse-hide-mobile hidden" role="dialog" id="popin-collapse-hide-mobile-2">
    <div class="popin-header">
      <a data-toggle="popin-collapse-hide-mobile">
        <span class="retraitespopulaires-icon retraitespopulaires-icon-arrow-down" aria-hidden="true"></span>
      </a>
    </div>
  </div>
  <div id="popin-3" class="panel popin" role="dialog" aria-labelledby="popin-title" aria-describedby="popin-body">
    <div class="panel-heading popin-header">
      <a class="popin-collapse-show-mobile" data-toggle="popin-collapse-show-mobile" data-target="#popin-collapse-hide-mobile-3">
        <span class="retraitespopulaires-icon retraitespopulaires-icon-mail" aria-hidden="true"></span>
      </a>
      <a href="#content-body-3" data-parent="#popins" id="popin-title-3" class="tracking-popin-collapse popin-title-container collapsed" data-toggle="collapse" aria-expanded="false" aria-controls="popin-body">
        <span class="retraitespopulaires-icon retraitespopulaires-icon-mail popin-icon" aria-hidden="true"></span>
        <p class="popin-title m-y-0" id="popin-title">Nous prenons contact avec vous</p>
        <span class="retraitespopulaires-icon retraitespopulaires-icon-angle m-l-auto" aria-hidden="true"></span>
      </a>
    </div>
    <div class="panel-collapse collapse popin-collapse" id="content-body-3">
      <p class="popin-title-closed m-y-0 hidden"></p>
      <div class="panel-body popin-body">
        <form class="rp-popin-form" novalidate="novalidate" action="#" method="post" id="rp-popin-form" accept-charset="UTF-8">
          <div class="status-messages"></div>
          <input type="hidden" name="uri" value="#" class="form-control">
          <div class="form-group">
            <div class="js-form-item form-item js-form-type-textfield form-item-name js-form-item-name">
              <div class="js-form-item form-item js-form-type-textfield form-item-name js-form-item-name">
                <label for="edit-name">Prénom, Nom *</label>
              </div>
              <input id="tracking-popin-name" type="text" name="name" value="" size="60" maxlength="128" class="form-text form-control">
            </div>
          </div>
          <div class="form-group">
            <div class="js-form-item form-item js-form-type-textfield form-item-contact js-form-item-contact">
              <div class="js-form-item form-item js-form-type-textfield form-item-contact js-form-item-contact">
                <label for="edit-contact">Votre e-mail ou numéro de téléphone*</label>
              </div>
              <input id="tracking-popin-contact" type="text" name="contact" value="" size="60" maxlength="128" class="form-text form-control">
            </div>
          </div>
          <div class="row d-flex flex-align-items-end">
            <div class="form-group col-xs-6 col-sm-8">
              <div class="js-form-item form-item js-form-type-textfield form-item-zip js-form-item-zip">
                <div class="js-form-item form-item js-form-type-textfield form-item-zip js-form-item-zip">
                  <label for="edit-zip">Votre code postal (NPA) *</label>
                </div>
                <input id="tracking-popin-npa" type="text" name="zip" value="" size="60" maxlength="128" placeholder="1000" class="form-text form-control">
              </div>
            </div>
            <div class="form-group col-xs-6 col-sm-4">
              <input class="btn-primary use-ajax-submit tracking-popin-submit button button--primary js-form-submit form-submit btn" type="submit" id="rp_popin_form_submit" name="rp_popin_form_submit_name" value="Envoyer">
            </div>
          </div>
        </form>
      </div>
    </div>
  </div>
  <div class="popin popin-collapse-hide-mobile hidden" role="dialog" id="popin-collapse-hide-mobile-3">
    <div class="popin-header">
      <a data-toggle="popin-collapse-hide-mobile">
        <span class="retraitespopulaires-icon retraitespopulaires-icon-arrow-down" aria-hidden="true"></span>
      </a>
    </div>
  </div>
</div>
