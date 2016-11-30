---
title: mandats-footer
name: mandats-footer
collection: organisms
notes: |
  ##### Usage : `mandats-footer`
  ##### Options :
  - **light** - <i>Boolean</i>
  - **theme** - <i>String</i> - <b>['assurance'|'prevoyance'|'immobilier'|'hypotheque'|'institutionnel'|'profelia'|'cpev'|'cip']</b>
---
<div class="footer">
  <h2 class="sr-only">Footer</h2>
  {% if not light %}
  <div class="container">
    <div class="row">
      <div class="col-xs-12 col-md-5">
        <div class="spacer spacer-md visible-xs visible-sm"></div>
        <p>Recevez le Bulletin <a href="#" class="pretty-link text-italic text-cip"><i>cipvd</i></a>, via e-mail:</p>
        <form>
          <div class="form-group">
            <div class="input-group full-width">
              <input type="text" class="form-control full-width" placeholder="Ex: aline.rochat@retraitespopulaires.ch" aria-label="Saisissez votre adresse e-mail.">
              <span class="input-group-btn">
                <button class="btn btn-default btn-cip" type="button">Je m'inscris</button>
              </span>
            </div>
          </div>
        </form>
      </div>

      <div class="col-xs-12 col-md-3 ">
        <div class="spacer spacer-md visible-xs visible-sm"></div>
        <p>Contactez-nous</p>
        {% include '../molecules/mandats-contact.html.swig' %}
      </div>
      <div class="col-xs-12 col-md-3">
        <div class="spacer spacer-md visible-xs visible-sm"></div>
        <p>Géré par <a href="#">Retraites Populaires</a></p>
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
          <li><a href="#" class="pretty-link text-cip">Impressum</a></li>
          <li><a href="#" class="pretty-link text-cip">Mentions juridiques</a></li>
          <li><a href="#" class="pretty-link text-cip">Plan du site</a></li>
        </ul>
      </div>
    </div>
  </div>

  <div class="spacer"></div>
</div>
