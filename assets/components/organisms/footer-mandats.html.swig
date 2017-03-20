---
title: footer-mandats
name: footer-mandats
collection: organisms
notes: |
  ##### Usage : `footer-mandats`
  ##### Options :
  - **footer_mandats_light** - <i>Boolean</i>
  - **footer_mandats_theme** - <i>String</i> - <b>['assurance'|'prevoyance'|'immobilier'|'hypotheque'|'institutionnel'|'profelia'|'cpev'|'cip']</b>
---
<div class="footer">
  <h2 class="sr-only">Footer</h2>
  {% if not footer_mandats_light %}
  <div class="container">
    <div class="row">
      <div class="col-xs-12 col-md-5">
        <div class="spacer spacer-md visible-xs visible-sm"></div>
        <p>Recevez le Bulletin <a href="#" class="pretty-link text-italic text-{{ footer_mandats_theme|default('cip') }}"><i>cipvd</i></a>, via e-mail:</p>
        <form>
          <div class="form-group">
            <div class="input-group full-width">
              <input type="text" class="form-control full-width" placeholder="Ex: aline.rochat@retraitespopulaires.ch" aria-label="Saisissez votre adresse e-mail.">
              <span class="input-group-btn">
                <button class="btn btn-default btn-{{ footer_mandats_theme|default('cip') }}" type="button">Je m'inscris</button>
              </span>
            </div>
          </div>
        </form>
      </div>

      <div class="col-xs-12 col-md-3 ">
        <div class="spacer spacer-md visible-xs visible-sm"></div>
        <p>Contactez-nous</p>

        <ul class="nav nav-tabs" role="tablist">
          <li role="presentation" class="active"><a href="#lausanne" aria-controls="lausanne" role="tab" data-toggle="tab">Lausanne (siège)</a></li>
        </ul>
        <div class="spacer spacer-sm"></div>
        <div class="row">
          <div class="col-xs-12">
            <div class="tab-content">
              <div role="tabpanel" class="tab-pane active" id="lausanne">
                <a href="tel:+41213482111" class="text-large text-no-wrap d-block text-{{ footer_mandats_theme|default('cip') }}">021 348 <strong>21 11</strong></a>
                <a href="mailto:info@cipvd.ch" class="text-large d-block text-{{ footer_mandats_theme|default('cip') }}">info@cipvd.ch</a>
              </div>
            </div>
          </div>
        </div>

      </div>
      <div class="col-xs-12 col-md-4">
        <div class="spacer spacer-md visible-xs visible-sm"></div>
        <p>Géré par <a class="pretty-link text-{{ footer_mandats_theme|default('cip') }}" href="#">Retraites&nbsp;Populaires</a></p>
      </div>
    </div>
  </div>

  <div class="spacer spacer-xs"></div>
  {% endif %}

  <div class="spacer"></div>

  <div class="container">
    <div class="row">
      <div class="col-xs-12 text-center">
        <ul class="menu-footer unordered-list list-inline list-unstyle-first">
          <li><a href="#" class="pretty-link text-{{ footer_mandats_theme|default('cip') }}">Impressum</a></li>
          <li><a href="#" class="pretty-link text-{{ footer_mandats_theme|default('cip') }}">Mentions juridiques</a></li>
          <li><a href="#" class="pretty-link text-{{ footer_mandats_theme|default('cip') }}">Plan du site</a></li>
        </ul>
      </div>
    </div>
  </div>

  <div class="spacer"></div>
</div>
