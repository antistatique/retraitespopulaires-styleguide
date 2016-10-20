---
title: footer
name: footer
collection: organisms
notes: |
  ##### Usage : `footer`
  ##### Options :
  - **light** - Boolean
  - **theme** - String
---
<div class="footer">
  {% if not light %}
  <div class="container">
    <div class="row">
      <div class="col-xs-12 text-center">
        <div class="spacer"></div>
        <h2>Retrouvez-nous sur les réseaux sociaux</h2>
        <p>Suivez-nous en temps réel sur Twitter. Facebook et vos plateformes préférées!</p>
        <div class="spacer spacer-xs"></div>
      </div>
    </div>

    <div class="row">
      <div class="col-xs-12 text-center">
        <div class="button-bubble button-bubble-social inline-block button-bubble-outline text-center">
          <div class="spacer spacer-xs"></div>
          <div class="bubble-icon">
            <a href="https://twitter.com/RetraitesPop" target="_blank"><i class="retraitespopulaires-icon retraitespopulaires-icon-3x retraitespopulaires-icon-twitter retraitespopulaires-icon-brand" aria-hidden="true"></i></a>
          </div>
        </div>

        <div class="button-bubble button-bubble-social inline-block button-bubble-outline text-center">
          <div class="spacer spacer-xs"></div>
          <div class="bubble-icon">
            <a href="https://www.facebook.com/retraitespopulaires" target="_blank"><i class="retraitespopulaires-icon retraitespopulaires-icon-3x retraitespopulaires-icon-facebook retraitespopulaires-icon-brand" aria-hidden="true"></i></a>
          </div>
        </div>

        <div class="button-bubble button-bubble-social inline-block button-bubble-outline text-center">
          <div class="spacer spacer-xs"></div>
          <div class="bubble-icon">
            <a href="https://www.youtube.com/user/RetraitesPopulaires" target="_blank"><i class="retraitespopulaires-icon retraitespopulaires-icon-3x retraitespopulaires-icon-youtube retraitespopulaires-icon-brand" aria-hidden="true"></i></a>
          </div>
        </div>

        <div class="button-bubble button-bubble-social inline-block button-bubble-outline text-center">
          <div class="spacer spacer-xs"></div>
          <div class="bubble-icon">
            <a href="https://www.instagram.com/retraitespopulaires" target="_blank"><i class="retraitespopulaires-icon retraitespopulaires-icon-3x retraitespopulaires-icon-instagram retraitespopulaires-icon-brand" aria-hidden="true"></i></a>
          </div>
        </div>

        <div class="button-bubble button-bubble-social inline-block button-bubble-outline text-center">
          <div class="spacer spacer-xs"></div>
          <div class="bubble-icon">
            <a href="https://www.linkedin.com/company/retraites-populaires" target="_blank"><i class="retraitespopulaires-icon retraitespopulaires-icon-3x retraitespopulaires-icon-linkedin retraitespopulaires-icon-brand" aria-hidden="true"></i></a>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div class="spacer"></div>

  <div class="container">
    <div class="row">
      <div class="col-xs-12 col-md-5 col-md-offset-1">
        <div class="spacer spacer-md visible-xs visible-sm"></div>
        <p>Recevez <a href="/savoir-faire" class="pretty-link text-italic"><i>Savoir-faire</i></a>, le bulletin des spécialistes de Retraites&nbsp;Populaires, trois fois par année via e-mail:</p>
        <form>
          <div class="form-group">
            <div class="input-group full-width">
              <input type="text" class="form-control full-width" placeholder="Ex: jane.doe@bluewin.ch">
              <span class="input-group-btn">
                <button class="btn btn-default" type="button">Je m'inscris</button>
              </span>
            </div>
          </div>
        </form>
      </div>

      <div class="col-xs-12 col-md-5 col-md-offset-1">
        <div class="spacer spacer-md visible-xs visible-sm"></div>
        <p>Contactez-nous</p>
        {% include '../molecules/tabs.html.swig' %}
      </div>
    </div>
  </div>

  <div class="spacer spacer-xs"></div>
  {% endif %}


  {% include '../atoms/organic-lines.html.swig' with {'theme': theme} %}

  <div class="spacer"></div>

  <div class="container">
    <div class="row">
      <div class="col-xs-12 text-center">
        <ul class="unordered-list list-inline list-unstyle-first">
          <li><a href="#" class="pretty-link text-{{theme}}">Impressum</a></li>
          <li><a href="#" class="pretty-link text-{{theme}}">Mentions juridiques</a></li>
          <li><a href="#" class="pretty-link text-{{theme}}">Glossaire</a></li>
        </ul>
      </div>
    </div>
  </div>

  <div class="spacer"></div>
</div>
