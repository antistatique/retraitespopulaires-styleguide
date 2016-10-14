---
title: dominique-schmid
name: advisor
collection: website
styleguide: false
layout: website.html.swig
---
{% include '../organisms/header.html.swig' %}
{% include '../atoms/funky-waves.html.swig' %}

<div class="container">
  <div class="row"></div>
    <div class="col-xs-12 text-center">
      {% include '../molecules/breadcrumb.html.swig' with {theme: 'text-primary', links: ['Accueil', 'Conseillers', 'Dominique Schmid']} %}
      <div class="spacer"></div>
    </div>
  </div>
</div>

<div class="container-fluid">
  <div class="row">
    <div class="col-xs-12 col-md-10 col-md-push-1 col-xl-6 col-xl-push-3">
      <h1 class="page-title text-center">Dominique Schmid</h1>
      <div class="spacer"></div>
      <div class="entity-content">
        <p>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
        </p>
      </div>

      <div class="spacer"></div>
      <div class="row">
        <div class="col-xs-8 col-xs-offset-2">
          {% include '../organisms/form-contact-advisor.html.swig' %}
        </div>
      </div>

    </div>
  </div>
</div>

<div class="spacer"></div>
{% include '../organisms/footer.html.swig' %}
