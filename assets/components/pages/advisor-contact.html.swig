---
title: advisor-contact
name: advisor-contact
collection: pages
styleguide: false
layout: page.html.swig
---
{% include '../organisms/header.html.swig' %}
{% include '../atoms/funky-waves.html.swig' %}

<div class="container">
  <div class="row"></div>
    <div class="col-xs-12 col-md-7 col-md-offset-4 col-lg-8 col-lg-offset-3 col-xl-6 col-xl-offset-3 text-center">
      {% include '../molecules/breadcrumb.html.swig' %}
      <div class="spacer"></div>
    </div>
  </div>
</div>

<div class="container-fluid">
  <div class="row">
    <div class="col-xs-12 col-md-7 col-md-push-4 col-lg-8 col-lg-push-3 col-xl-6 col-xl-push-3">
      <h1 class="page-title text-center">Dominique Schmid </h1>
      <div class="spacer"></div>
      <div class="entity-form">
        <form class="" action="index.html" method="post">
          <div class="form-group">
            <label for="firstname">Prénom</label>
            <input class="form-control" id="firstname" type="text" placeholder=""></input>
          </div>
          <div class="form-group">
            <label for="lastname">Nom</label>
            <input class="form-control" id="lastname" type="text" placeholder=""></input>
          </div>
          <div class="form-group">
            <label for="email">E-mail</label>
            <input class="form-control" id="email" type="text" placeholder=""></input>
          </div>
          <div class="form-group">
            <label for="birthdate">Date de naissance (JJ.MM.AAAA)</label>
            <input class="form-control" id="birthdate" type="text" placeholder=""></input>
          </div>
          <div class="form-group">
            <label for="address">Adresse</label>
            <input class="form-control" id="address" type="text" placeholder=""></input>
          </div>
          <div class="form-group">
            <label for="zip">Code postal</label>
            <input class="form-control" id="zip" type="text" placeholder=""></input>
          </div>
          <div class="form-group">
            <label for="city">Ville</label>
            <input class="form-control" id="city" type="text" placeholder=""></input>
          </div>
          <div class="form-group">
            <label for="phone">Téléphone</label>
            <input class="form-control" id="phone" type="text" placeholder=""></input>
          </div>
          <div class="form-group">
            <label for="subject">Sujet de votre message</label>
            <input class="form-control" id="subject" type="text" placeholder=""></input>
          </div>
          <div class="form-group">
            <label for="message">Votre message</label>
            <textarea></textarea>
          </div>
        </form>
      </div>
      </div>
    <div class="col-xs-12 col-md-4 col-md-pull-7 col-lg-3 col-lg-pull-8 col-xl-2 col-xl-pull-6">
      <div class="spacer spacer-xl visible-xs visible-sm"></div>
      {% include '../molecules/secondary-nav.html.swig' with {'theme': 'assurance'} %}
    </div>
  </div>
</div>
<div class="spacer spacer-xl"></div>
{% include '../organisms/footer.html.swig' %}
