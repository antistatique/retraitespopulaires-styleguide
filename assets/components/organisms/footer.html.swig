---
title: Footer
name: footer
collection: organisms
notes: |
  Can be wrapped in `.theme-[theme]` to change look. <br>
variants:
  light: Footer Light
---
<div class="footer hidden-print">

  {% if variant != 'light' %}
  <div class="container">
    <div class="row">
      <!-- Socialnetwork -->
      <div class="col-xs-12 col-md-6">
        <h4>Réseaux sociaux</h4>
        <p>Suivez-nous en temps réel sur Twitter, Facebook et vos plateformes préférées!</p>
        <div class="spacer spacer-xs"></div>

        <div class="social-list">
          <div class="button-bubble button-bubble-social inline-block button-bubble-outline text-center">
            <div class="spacer spacer-xs"></div>
            <div class="bubble-icon">
              <a aria-label="Cliquez pour accéder au compte Twitter de Retraites Populaires" href="https://twitter.com/RetraitesPop" target="blank"><i class="retraitespopulaires-icon retraitespopulaires-icon-3x retraitespopulaires-icon-twitter retraitespopulaires-icon-color" aria-hidden="true"></i></a>
            </div>
          </div>

          <div class="button-bubble button-bubble-social inline-block button-bubble-outline text-center">
            <div class="spacer spacer-xs"></div>
            <div class="bubble-icon">
              <a aria-label="Cliquez pour accéder au compte Facebook de Retraites Populaires" href="https://www.facebook.com/retraitespopulaires" target="blank"><i class="retraitespopulaires-icon retraitespopulaires-icon-3x retraitespopulaires-icon-facebook retraitespopulaires-icon-color" aria-hidden="true"></i></a>
            </div>
          </div>

          <div class="button-bubble button-bubble-social inline-block button-bubble-outline text-center">
            <div class="spacer spacer-xs"></div>
            <div class="bubble-icon">
              <a aria-label="Cliquez pour accéder au compte YouTube de Retraites Populaires" href="https://www.youtube.com/user/RetraitesPopulaires" target="blank"><i class="retraitespopulaires-icon retraitespopulaires-icon-3x retraitespopulaires-icon-youtube retraitespopulaires-icon-color" aria-hidden="true"></i></a>
            </div>
          </div>

          <div class="button-bubble button-bubble-social inline-block button-bubble-outline text-center">
            <div class="spacer spacer-xs"></div>
            <div class="bubble-icon">
              <a aria-label="Cliquez pour accéder au compte Instagram de Retraites Populaires" href="https://www.instagram.com/retraitespopulaires" target="blank"><i class="retraitespopulaires-icon retraitespopulaires-icon-3x retraitespopulaires-icon-instagram retraitespopulaires-icon-color" aria-hidden="true"></i></a>
            </div>
          </div>

          <div class="button-bubble button-bubble-social inline-block button-bubble-outline text-center">
            <div class="spacer spacer-xs"></div>
            <div class="bubble-icon">
              <a aria-label="Cliquez pour accéder au compte LinkedIn de Retraites Populaires" href="https://www.linkedin.com/company/retraites-populaires" target="blank"><i class="retraitespopulaires-icon retraitespopulaires-icon-3x retraitespopulaires-icon-linkedin retraitespopulaires-icon-color" aria-hidden="true"></i></a>
            </div>
          </div>
        </div>
      </div>

      <!-- Newsletter -->
      <div class="col-xs-12 col-md-5 col-md-offset-1">
        <div class="spacer spacer-md visible-xs visible-sm"></div>
        <h4>Newsletter</h4>
        <p>Recevez <a href="#" class="pretty-link text-italic"><i>Savoir-faire</i></a>, le bulletin des spécialistes de Retraites&nbsp;Populaires, trois fois par année via e-mail:</p>

        <form class="rp-newsletter-form" action="#" method="post" id="rp-newsletter-form" accept-charset="UTF-8">
          <div class="form-group">
            <div class="input-group">
              <div class="form-group form-no-label">
                <input class="full-width form-text required form-control" type="text" id="edit-email" name="email" value="" size="60" maxlength="128" placeholder="Ex: alain.rochat@retraitespopulaires.ch" required="required" aria-required="true">
              </div>
              <span class="input-group-btn">
                <input class="btn btn-default button btn-primary" type="submit" id="edit-submit--2" name="op" value="Je m'inscris">
              </span>
            </div>
          </div>
        </form>
      </div>
    </div>
  </div>

  <div class="container">
    <div class="row">

      <!-- Contacts -->
      <div class="col-xs-12">
        <div class="spacer"></div>
        <h4>Contactez-nous</h4>
        <div class="spacer spacer-xs"></div>

        <div class="row">
          <!-- Lausanne -->
          <div class="col-xs-12 col-sm-6 col-md-4 m-b-1">
            <h4 class="text-muted m-t-0 text-secondary">Lausanne</h4>
            <a href="tel:+41213482111" class=" text-no-wrap">+41 21 348 21 11</a><br>
            <a href="mailto:info@retraitespopulaires.ch" class="">info@retraitespopulaires.ch</a>
          </div>

          <!-- Yverdon-les-Bains -->
          <div class="col-xs-12 col-sm-6 col-md-4 m-b-1">
            <h4 class="text-muted m-t-0 text-secondary">Yverdon-les-Bains</h4>
            <a href="tel:+41213482821" class=" text-no-wrap">+41 21 348 28 21</a><br>
            <a href="mailto:yverdon@retraitespopulaires.ch" class="">yverdon@retraitespopulaires.ch</a>
          </div>

          <!-- Nyon -->
          <div class="col-xs-12 col-sm-6 col-md-4 m-b-1">
            <h4 class="text-muted m-t-0 text-secondary">Nyon</h4>
            <a href="tel:+41213482020" class=" text-no-wrap">+41 21 348 20 20</a><br>
            <a href="mailto:nyon@retraitespopulaires.ch" class="">nyon@retraitespopulaires.ch</a>
          </div>
        </div>
      </div>
    </div>
  </div>

  <div class="spacer spacer-xs"></div>
  {% endif %}

  {% include '../atoms/organic-lines.html.swig' %}

  <div class="spacer"></div>

  <div class="container">
    <div class="row">
      <div class="col-xs-12 text-center">
        <ul class="menu-footer unordered-list list-inline list-unstyle-first">
          <li><a class="pretty-link" href="/impressum" target="">Impressum</a></li>
          <li><a class="pretty-link" href="/mentions-juridiques" target="">Mentions juridiques</a></li>
        </ul>
      </div>
    </div>
  </div>
  <div class="spacer"></div>
</div>







