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
        <p>Recevez le <a href="#" class="pretty-link text-italic text-{{ footer_mandats_theme|default('cip') }}"><i>Bulletin CIP</i></a>, via e-mail:</p></p>
        <p><a class="btn btn-primary btn-{{ footer_mandats_theme|default('cip') }}" href="#">Je m'inscris au Bulletin CIP</a></p>
      </div>

      <div class="col-xs-12 col-md-3 ">
        <div class="spacer spacer-md visible-xs visible-sm"></div>
        <p>Contactez-nous</p>

        <div class="row">
          <div class="col-xs-12">
            <a href="tel:+41213482111" class="text-large text-no-wrap text-{{ footer_mandats_theme|default('cip') }}">021 348 21 11</a><br>
            <a href="mailto:info@cipvd.ch" class="text-large text-{{ footer_mandats_theme|default('cip') }}">info@cipvd.ch</a>
          </div>
        </div>
      </div>

      <div class="col-xs-12 col-md-4">
        <div class="spacer spacer-md visible-xs visible-sm"></div>
        {% include "../atoms/managed-by-link.html.swig" %}
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
