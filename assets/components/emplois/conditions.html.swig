---
title: conditions-d-utilisation
name: conditions
collection: emplois
styleguide: false
layout: emplois.html.swig
---
---
title: cree-mon-compte-validation
name: signup-validation
collection: emplois
styleguide: false
layout: emplois.html.swig
---
{% include '../organisms/header.html.swig' with {'light': true} %}

{% include '../organisms/header.html.swig' with {'light': true} %}
<div class="spacer spacer-xl"></div>

<div class="container">
  <div class="row"></div>
    <div class="col-xs-12 text-center">
      {% include '../molecules/breadcrumb.html.swig' with {theme: 'text-primary', links: ['Accueil', 'Emploi', "Conditions d'utilisation"]} %}
      <div class="spacer"></div>
    </div>
  </div>
</div>

<div class="container-fluid">
  <div class="row">
    <div class="col-xs-12 col-md-8 col-md-offset-2">
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
</div>

<div class="spacer"></div>
{% include '../organisms/footer.html.swig' with {'light': true} %}
