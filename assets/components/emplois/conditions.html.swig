---
title: conditions-d-utilisation
name: conditions
collection: emplois
styleguide: false
layout: emplois.html.swig
---
{% include '../organisms/header.html.swig' with {'light': true} %}
<div class="spacer spacer-xl"></div>
<div class="spacer spacer-xl hidden-md hidden-lg"></div>

<div class="container">
  <div class="row">
    <div class="col-xs-12 text-center">
      {% include '../molecules/breadcrumb.html.swig' with {breadcrumb_theme: 'text-primary', breadcrumb_links: ['Accueil', 'Emploi', "Conditions d'utilisation"]} %}
      <div class="spacer"></div>
    </div>
  </div>
</div>

<div class="container-fluid">
  <div class="row">
    <div class="col-xs-12 col-md-7 col-md-push-4 col-lg-8 col-lg-push-3 col-xl-6 col-xl-push-3">
      <h1 class="page-title text-center">Conditions d'utilisation de l'outil de recrutement</h1>
      <div class="spacer"></div>
      <div class="row">
        <div class="col-xs-12">
          <div class="entity-content">
            <p class="">En acceptant <a href="#" class="pretty-link">les conditions d'utilisation de l'outil de recrutement</a>, vous donnez votre accord à Retraites Populaires afin qu'elle procède, aux fins de recrutement, $ la collecte et au traitement de vos données personnelles selon les modalités qui y sont décrites. Retritess Populaires s'engage à prendre toutes les mesures nécessaires au respect de la législation sur la protection des données.</p>
          </div>

          <div class="">
            <div class="form-group">
              <div class="input-checkbox">
                <input type="checkbox" value="agree">
                <label>J'accepte les conditions d'utilisation</label>
              </div>
            </div>
            <hr />
            <button type="submit" class="btn btn-primary btn-lg pull-right">Valider</button>
          </form>

        </div>
      </div>
    </div>
  </div>
  <div class="col-xs-12 col-md-4 col-md-pull-7 col-lg-3 col-lg-pull-8 col-xl-2 col-xl-pull-6">
    <div class="spacer spacer-xl visible-xs visible-sm"></div>
    {% include '../molecules/secondary-nav.html.swig' with {'secondary_nav_theme': '', 'secondary_nav_json': 'emploi'} %}
  </div>
</div>

<div class="spacer"></div>
{% include '../organisms/footer.html.swig' with {'footer_light': true} %}
