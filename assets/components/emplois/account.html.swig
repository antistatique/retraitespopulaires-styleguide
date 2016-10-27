---
title: mon-compte
name: account
collection: emplois
styleguide: false
layout: emplois.html.swig
---
{% include '../organisms/header.html.swig' with {'light': true} %}
<div class="spacer spacer-xl"></div>
<div class="spacer spacer-xl hidden-md hidden-lg"></div>

<div class="container">
  <div class="row"></div>
    <div class="col-xs-12 text-center">
      {% include '../molecules/breadcrumb.html.swig' with {theme: 'text-primary', links: ['Accueil', 'Emploi', 'Mon compte']} %}
      <div class="spacer"></div>
    </div>
  </div>
</div>

<div class="container-fluid">
  <div class="row">
    <div class="col-xs-12 col-md-7 col-md-push-4 col-lg-8 col-lg-push-3 col-xl-6 col-xl-push-3">
      <h1 class="page-title text-center">Mon compte</h1>
      <div class="spacer"></div>

      <ul class="nav nav-tabs nav-tabs-expanded" role="tablist">
        <li role="presentation" class="active"><a href="#contactinfo" aria-controls="lausanne" role="tab" data-toggle="tab">Coordonnées</a></li>
        <li role="presentation"><a href="#resume" aria-controls="resume" role="tab" data-toggle="tab">CV</a></li>
        <li role="presentation"><a href="#skills" aria-controls="skills" role="tab" data-toggle="tab">Compétences</a></li>
        <li role="presentation"><a href="#files" aria-controls="files" role="tab" data-toggle="tab">Documents</a></li>
        <li role="presentation"><a href="#references" aria-controls="references" role="tab" data-toggle="tab">Références</a></li>
      </ul>

      <div class="spacer spacer-sm"></div>

      <div class="row">
        <div class="col-xs-12">
          <div class="tab-content">
            <div role="tabpanel" class="tab-pane active" id="contactinfo">
              <p>Veuillez saisir vos informations personnes. <br/>
              Votre e-mail est unique et ne peut pas être modifié.</p>
              <div class="spacer spacer-xs"></div>
              {% include '../organisms/form-job-contactinfo.html.swig' %}
            </div>
            <div role="tabpanel" class="tab-pane" id="resume">
              <p>Merci de renseigner votre dossier de candidature, ou de nous envoyer votre CV par <a href="#" class="pretty-link">le lien suivant</a>.</p>

              <div class="spacer spacer-sm"></div>
              <a href="#" class="btn btn-icon btn-primary">
                <i class="retraitespopulaires-icon retraitespopulaires-icon-linkedin" aria-hidden="true"></i> Se connecter à LinkedIn
              </a>
              <div class="spacer spacer-xs"></div>
              <p class="text-small">Connectez-vous à votre compte LinkedIn pour accéder à vos informations et les importer dans votre dossier.</p>

              <div class="spacer spacer-sm"></div>
              <h3>Expérience</h3>
              <div class="spacer spacer-xs"></div>
              <p>Aucun résultat</p>
              <a href="#" class="btn btn-primary btn-lg">Ajouter</a>

              <div class="spacer spacer-md"></div>
              <h3>Diplômes</h3>
              <div class="spacer spacer-xs"></div>
              <p>Aucun résultat</p>
              <a href="#" class="btn btn-primary btn-lg">Ajouter</a>

              <div class="spacer spacer-md"></div>
              <h3>Languges</h3>
              <div class="spacer spacer-xs"></div>
              <p>Aucun résultat</p>
              <a href="#" class="btn btn-primary btn-lg">Ajouter</a>

            </div>
            <div role="tabpanel" class="tab-pane" id="skills">
              {% include '../organisms/form-job-skill.html.swig' %}
            </div>
            <div role="tabpanel" class="tab-pane" id="files">
              <p>Veuillez nous transmettre votre CV et une lettre de motivation.</p>
              <a href="#" class="btn btn-primary btn-lg">Ajouter</a>
            </div>
            <div role="tabpanel" class="tab-pane" id="references">
              <p>Merci de nous indiquer des personnes de référence que nous pouvons joindre.</p>
              <a href="#" class="btn btn-primary btn-lg">Ajouter</a>
            </div>
          </div>
        </div>
      </div>

    </div>
    <div class="col-xs-12 col-md-4 col-md-pull-7 col-lg-3 col-lg-pull-8 col-xl-2 col-xl-pull-6">
      <div class="spacer spacer-xl visible-xs visible-sm"></div>
      {% include '../molecules/secondary-nav.html.swig' with {'theme': '', 'json': 'emploi'} %}
    </div>
  </div>
</div>

<div class="spacer"></div>
{% include '../organisms/footer.html.swig' with {'light': true} %}
