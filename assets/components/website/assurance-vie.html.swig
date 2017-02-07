---
title: assurance-vie
name: assurance-vie
collection: website
styleguide: false
layout: website.html.swig
---
{% include '../organisms/header.html.swig' %}

{% include '../atoms/funky-waves.html.swig' with {funky_waves_img: 'https://www.retraitespopulaires.ch/sites/default/files/styles/rp_full_screen_xl/public/covers-page/2016-11/2014assurance.jpg'} %}

<div class="container">
  <div class="row">
    <div class="col-xs-12 col-md-7 col-md-offset-4 col-lg-8 col-lg-offset-3 col-xl-6 col-xl-offset-3 text-center">
      {% include '../molecules/breadcrumb.html.swig' with {breadcrumb_theme: 'text-assurance', breadcrumb_links: ['Accueil', 'Assurance vie']} %}
      <div class="spacer"></div>
    </div>
  </div>
</div>

<div class="container-fluid">
  <div class="row">
    <div class="col-xs-12 col-md-7 col-md-push-4 col-lg-8 col-lg-push-3 col-xl-6 col-xl-push-3">
      <h1 class="page-title text-center">Assurance vie</h1>
      <div class="spacer"></div>
      <div class="entity-content">
        <p>
          Chaque étape du parcours d’une personne est marquée de désirs, ambitions et actions. Retraites Populaires accompagne les Vaudois tout le long de la vie, avec des produits de 3e pilier simples, adaptés à chaque situation et chaque projet.
        </p>
        <p>Découvrez les produits en cliquant sur les cases du tableau:</p>
      </div>

      <div class="spacer"></div>
      <div class="row">
        <div class="col-xs-12">
          <div class="h1 text-center">Retraites Populaires peut vous aider ! Voici la gamme complète des produits 3e pilier A et B.</div>
          <div class="spacer spacer-md"></div>
        </div>

        <div class="col-md-4">
          {% include '../atoms/filters-list.html.swig' with {'filters_list_title': 'Votre versement', 'filters_list_links': ['Une seule prime', 'Plusieurs prime'], 'filters_list_theme': 'assurance'} %}

          <div class="spacer spacer-sm"></div>
          {% include '../atoms/filters-list.html.swig' with {'filters_list_title': 'Fiscalité', 'filters_list_links': ['3e pillier B', 'Plusieurs prime'], 'filters_list_theme': 'assurance'} %}

          <div class="spacer spacer-sm"></div>
          {% include '../atoms/filters-list.html.swig' with {'filters_list_title': 'Forme de prestation', 'filters_list_links': ['Capital', 'Plusieurs prime'], 'filters_list_theme': 'assurance'} %}

          <div class="spacer spacer-sm"></div>
          {% include '../atoms/filters-list.html.swig' with {'filters_list_title': 'Couverture', 'filters_list_links': ['Prestation en cas de vie', 'Prestation en cas de décès'], 'filters_list_theme': 'assurance'} %}
          <div class="spacer spacer-sm"></div>
        </div>
        <div class="col-md-8">
          <div class="row row-flex">
            <div class="col-sm-6">
              {% include '../molecules/teaser-product.html.swig' with {'teaser_product_theme':'assurance', 'teaser_product_title': 'Rente Immédiate', 'teaser_product_body': 'Profitez de votre retraite! Placez un capital de manière sûre et bénéficiez tout de suite de rentes à vie..'} %}
            </div>
            <div class="col-sm-6">
              {% include '../molecules/teaser-product.html.swig' with {'teaser_product_theme':'assurance', 'teaser_product_title': 'Rente Immédiate certain', 'teaser_product_body': 'Réalisez vos projets! Transformez votre capital en revenu supplémentaire garanti.'} %}
            </div>
          </div>
          <div class="row">
            <div class="col-sm-6">
              {% include '../molecules/teaser-product.html.swig' with {'teaser_product_theme':'assurance', 'teaser_product_title': 'Rente différée', 'teaser_product_body': 'Simplifiez-vous l’avenir! Préparez votre retraite à votre rythme et sans contrainte.'} %}
            </div>
            <div class="col-sm-6">
              {% include '../molecules/teaser-product.html.swig' with {'teaser_product_theme':'assurance', 'teaser_product_title': 'Jeune', 'teaser_product_body': 'Réalisez vos projets! Transformez votre capital en revenu supplémentaire garanti.'} %}
            </div>
          </div>
          <div class="row">
            <div class="col-sm-6">
              {% include '../molecules/teaser-product.html.swig' with {'teaser_product_theme':'assurance', 'teaser_product_title': 'Duo primes périodiques', 'teaser_product_body': 'Donnez de la valeur à votre avenir! Constituez un capital tout en économisant des impôts.'} %}

            </div>
            <div class="col-sm-6">
              {% include '../molecules/teaser-product.html.swig' with {'teaser_product_theme':'assurance', 'teaser_product_title': 'Prime unique', 'teaser_product_body': 'Donnez du tonus à votre avenir! Investissez dans un placement garanti et bénéficiez d’avantages fiscaux.'} %}
            </div>
          </div>
          <div class="row">
            <div class="col-sm-6">
              {% include '../molecules/teaser-product.html.swig' with {'teaser_product_theme':'assurance', 'teaser_product_title': 'Épargne', 'teaser_product_body': 'Prenez soin de votre épargne! Capitalisez sans risque.'} %}
            </div>
            <div class="col-sm-6">
              {% include '../molecules/teaser-product.html.swig' with {'teaser_product_theme':'assurance', 'teaser_product_title': 'Refuge', 'teaser_product_body': 'Sécurisez votre avenir! Protégez votre conjoint ou votre famille, garantissez un emprunt bancaire ou assurez la pérennité de votre entreprise.'} %}
            </div>
          </div>
          <div class="row">
            <div class="col-sm-6">
              {% include '../molecules/teaser-product.html.swig' with {'teaser_product_theme':'assurance', 'teaser_product_title': 'Securifonds', 'teaser_product_body': 'Prenez votre avenir en main! Gérez votre patrimoine en alliant sécurité et opportunités de rendement à long terme.'} %}
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="col-xs-12 col-md-4 col-md-pull-7 col-lg-3 col-lg-pull-8 col-xl-2 col-xl-pull-6">
      <div class="spacer spacer-xl visible-xs visible-sm"></div>
      {% include '../molecules/secondary-nav.html.swig' with {'secondary_nav_theme': 'assurance', 'secondary_nav_json': 'assurance-vie'} %}
    </div>
  </div>
  {% include '../organisms/attachments-contact.html.swig' with {'attachments_contact_theme': 'assurance'} %}
</div>
<div class="attachements-wrapper">
  <div class="container">
    <div class="row">
      <div class="col-xs-12 col-md-6">
        {% include '../molecules/card-attachement.html.swig' with {'card_attachement_theme': 'assurance', 'card_attachement_type': 'faq', 'card_attachement_title':'Questions fréquentes', 'card_attachement_links': ['Qu’est-ce qu’un 3e pilier A ou prévoyance liée?', 'Comment maintenir son niveau de vie à la retraite?', 'Qu’en est-il du 3e pilier en cas de divorce?'], 'card_attachement_more': 'Accéder à toutes les questions sur l’assurance vie'} %}
      </div>
      <div class="col-xs-12 col-md-6">
        {% include '../molecules/card-attachement.html.swig' with {'card_attachement_theme': 'assurance', 'card_attachement_type': 'document', 'card_attachement_title':'Documents utiles', 'card_attachement_links': [
        'Brochure Conseil global',
        'Procuration',
        'Modification des primes et prestations'],
        'card_attachement_more': "Tous les documents d'assurance vie"} %}
      </div>
    </div>
  </div>
  {% include '../atoms/organic-lines.html.swig' with {'organic_lines_theme': 'assurance'} %}
</div>

<div class="spacer"></div>
{% include '../organisms/footer.html.swig' %}
