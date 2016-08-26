---
title: footer
name: footer
collection: organisms
notes: |
  ##### Usage : `footer`
---
<div class="footer">
  <div class="container">
    <div class="row">
      <div class="col-xs-12 text-center">
        <div class="spacer"></div>
        <h2>Retrouvez-nous sur les réseaux sociaux</h2>
        <p>Suivez-nous en temps réel sur Twitter. FAcebook et vos plateformes préférées!</p>
        <div class="spacer spacer-xs"></div>
      </div>
    </div>

    <div class="row">
      <div class="col-xs-12 text-center">
        <div class="button-bubble button-bubble-social inline-block button-bubble-outline text-center">
          <div class="spacer spacer-xs"></div>
          <div class="bubble-icon">
            <a href="https://twitter.com/RetraitesPop" target="_blank"><i class="retraitespopulaires-icon retraitespopulaires-icon-3x retraitespopulaires-icon-twitter retraitespopulaires-icon-colored" aria-hidden="true"></i></a>
          </div>
        </div>

        <div class="button-bubble button-bubble-social inline-block button-bubble-outline text-center">
          <div class="spacer spacer-xs"></div>
          <div class="bubble-icon">
            <a href="https://www.facebook.com/retraitespopulaires" target="_blank"><i class="retraitespopulaires-icon retraitespopulaires-icon-3x retraitespopulaires-icon-facebook retraitespopulaires-icon-colored" aria-hidden="true"></i></a>
          </div>
        </div>

        <div class="button-bubble button-bubble-social inline-block button-bubble-outline text-center">
          <div class="spacer spacer-xs"></div>
          <div class="bubble-icon">
            <a href="https://www.youtube.com/user/RetraitesPopulaires" target="_blank"><i class="retraitespopulaires-icon retraitespopulaires-icon-3x retraitespopulaires-icon-youtube retraitespopulaires-icon-colored" aria-hidden="true"></i></a>
          </div>
        </div>

        <div class="button-bubble button-bubble-social inline-block button-bubble-outline text-center">
          <div class="spacer spacer-xs"></div>
          <div class="bubble-icon">
            <a href="https://www.instagram.com/retraitespopulaires" target="_blank"><i class="retraitespopulaires-icon retraitespopulaires-icon-3x retraitespopulaires-icon-instagram retraitespopulaires-icon-colored" aria-hidden="true"></i></a>
          </div>
        </div>

        <div class="button-bubble button-bubble-social inline-block button-bubble-outline text-center">
          <div class="spacer spacer-xs"></div>
          <div class="bubble-icon">
            <a href="https://www.linkedin.com/company/retraites-populaires" target="_blank"><i class="retraitespopulaires-icon retraitespopulaires-icon-3x retraitespopulaires-icon-linkedin retraitespopulaires-icon-colored" aria-hidden="true"></i></a>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div class="spacer"></div>

  <div class="container">
    <div class="row">
      <div class="col-xs-12 col-md-5 col-md-offset-1">
        <p>Le Bulletin des spécialistes de Retraites Populaires, directement par email:</p>
        <form>
          <div class="form-group">
            <div class="input-group">
              <input type="text" class="form-control" placeholder="Ex: jane.doe@bluewin.ch">
              <span class="input-group-btn">
                <button class="btn btn-default" type="button">Je m'inscris</button>
              </span>
            </div>
          </div>
        </form>
      </div>

      <div class="col-xs-12 col-md-5 col-md-offset-1">
        <p>Contactez-nous</p>
        {% include '../molecules/tabs.html.swig' %}
        <a href="mailto:info@retraitespopulaires.ch" class="text-large">info@retraitespopulaires.ch</a>
      </div>
    </div>
  </div>

  <div class="spacer spacer-xs"></div>

  {% include '../atoms/organic-lines.html.swig' %}

  <div class="spacer"></div>

  <div class="container">
    <div class="row">
      <div class="col-xs-12 text-center">
        <ul class="unordered-list list-inline">
          <li><a href="#" class="pretty-link">Impressum</a></li>
          <li><a href="#" class="pretty-link">Mentions juridiques</a></li>
          <li><a href="#" class="pretty-link">Glossaire</a></li>
          <li>Résalisation: <a class="signature pretty-link" href="#">Antistatique</a></li>
        </ul>
      </div>
    </div>
  </div>

  <div class="spacer"></div>
</div>
