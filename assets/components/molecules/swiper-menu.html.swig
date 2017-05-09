---
title: swiper-menu
name: swiper-menu
collection: molecules
---
<div class="swiper-menu">
  <h2 class="sr-only">Navigation principale</h2>
  <div class="hidden-xs hidden-sm">
    {% include '../molecules/big-menu-empty.html.swig' %}
  </div>
  <div class="swiper-column-wrapper col-xs-12 col-md-4">
    <div class="swiper-column swiper-column-1">
      <ul data-list="swiper-main" class="swiper-list swiper-list-first list-no-padding swiper-list-primary list-no-style" role="navigation">
        <li>
          <a href="/retraitespopulaires-styleguide/assurance-vie" class="pretty-link text-assurance">Assurance vie</a>
          <a aria-label="Cliquez pour ouvrir le sous-menu Assurance Vie" href="swiper-assurance-vie" class="retraitespopulaires-icon retraitespopulaires-icon-arrow-thin arrow arrow-next arrow-rounded arrow-small arrow-assurance"></a>
        </li>
        <li>
          <a href="#" class="pretty-link text-prevoyance">Prévoyance professionnelle</a>
          <a aria-label="Cliquez pour ouvrir le sous-menu" href="swiper-prevoyance" class="retraitespopulaires-icon retraitespopulaires-icon-arrow-thin arrow arrow-next arrow-rounded arrow-small arrow-prevoyance"></a>
        </li>
        <li>
          <a href="#" class="pretty-link text-immobilier">Immobilier</a>
          <a aria-label="Cliquez pour ouvrir le sous-menu" href="swiper-immobilier" class="retraitespopulaires-icon retraitespopulaires-icon-arrow-thin arrow arrow-next arrow-rounded arrow-small arrow-immobilier"></a>
        </li>
        <li>
          <a href="#" class="pretty-link text-hypotheque">Financement</a>
          <a aria-label="Cliquez pour ouvrir le sous-menu" href="swiper-hypotheque" class="retraitespopulaires-icon retraitespopulaires-icon-arrow-thin arrow arrow-next arrow-rounded arrow-small arrow-hypotheque"></a>
        </li>
      </ul>
      <div class="spacer"></div>
      <p class="media-heading text-small swiper-padding text-muted">Vous êtes</p>
      <ul class="swiper-list swiper-list-first swiper-list-secondary list-no-style list-no-padding" role="navigation">
        <li class="text-primary icon-text icon-text-center">
          <span class="retraitespopulaires-icon retraitespopulaires-icon-particuliers retraitespopulaires-icon-2x"></span> <a href="/retraitespopulaires-styleguide/particuliers" class="icon-text-txt text-secondary h5">Particuliers</a>
          <a href="swiper-particuliers" class="retraitespopulaires-icon retraitespopulaires-icon-arrow-thin arrow arrow-next arrow-rounded arrow-small"></a>
        </li>
        <li class="text-primary icon-text icon-text-center">
          <span class="retraitespopulaires-icon retraitespopulaires-icon-entreprises retraitespopulaires-icon-2x"></span> <a href="#" class="icon-text-txt text-secondary h5">Professionnels</a>
          <a href="swiper-professionnels" class="retraitespopulaires-icon retraitespopulaires-icon-arrow-thin arrow arrow-next arrow-rounded arrow-small"></a>
        </li>
        <li class="text-primary icon-text icon-text-center">
          <span class="retraitespopulaires-icon retraitespopulaires-icon-collectivites retraitespopulaires-icon-2x"></span> <a href="#" class="icon-text-txt text-secondary h5">Collectivés</a>
          <a href="swiper-collectivites" class="retraitespopulaires-icon retraitespopulaires-icon-arrow-thin arrow arrow-next arrow-rounded arrow-small"></a>
        </li>
      </ul>
      <div class="spacer"></div>
    </div>
  </div>
  <div class="swiper-column-wrapper swiper-column-wrapper-2 col-xs-12 col-md-4">
    <div class="swiper-column swiper-column-2">

      <ul data-list="swiper-particuliers" class="swiper-list swiper-list-alternative swiper-list-middle list-no-padding list-spaced list-no-style" role="navigation">
        <li class="swiper-back visible-xs visible-sm">
          <a href="swiper-main" class="retraitespopulaires-icon retraitespopulaires-icon-arrow-thin arrow arrow-back arrow-small arrow-flip arrow-particuliers"></a>
          <a href="/retraitespopulaires-styleguide/particuliers" class="text-muted pretty-link pretty-link-light-gray text-primary text-secondary">Particuliers</a>
        </li>
        <li>
          <p class="media-heading text-small text-muted">Nouveau projet</p>
        </li>
        <li>
          <a href="#" class="pretty-link text-secondary">Fortune</a>
          <a href="swiper-particulier-fortune" class="retraitespopulaires-icon retraitespopulaires-icon-arrow-thin arrow arrow-next arrow-small arrow-particuliers"></a>
        </li>
        <li>
          <a href="/retraitespopulaires-styleguide/famille" class="pretty-link text-secondary">Famille</a>
          <a href="swiper-particulier-famille" class="retraitespopulaires-icon retraitespopulaires-icon-arrow-thin arrow arrow-next arrow-small arrow-particuliers"></a>
        </li>
        <li>
          <a href="#" class="pretty-link text-secondary">Travail</a>
          <a href="swiper-particulier-travail" class="retraitespopulaires-icon retraitespopulaires-icon-arrow-thin arrow arrow-next arrow-small arrow-particuliers"></a>
        </li>
        <li>
          <a href="#" class="pretty-link text-secondary">Retraite</a>
          <a href="swiper-particulier-retraite" class="retraitespopulaires-icon retraitespopulaires-icon-arrow-thin arrow arrow-next arrow-small arrow-particuliers"></a>
        </li>
        <li>
          <a href="#" class="pretty-link text-secondary">Logement</a>
          <a href="swiper-particulier-logement" class="retraitespopulaires-icon retraitespopulaires-icon-arrow-thin arrow arrow-next arrow-small arrow-particuliers"></a>
        </li>
        <li>
          <p class="media-heading text-small text-muted">Déjà client</p>
        </li>
         <li>
          <a href="#" class="pretty-link text-secondary">Assuré 2e pilier</a>
        </li>
         <li>
          <a href="#" class="pretty-link text-secondary">Assuré 3e pilier</a>
          <a href="swiper-particulier-3pilier" class="retraitespopulaires-icon retraitespopulaires-icon-arrow-thin arrow arrow-next arrow-small arrow-particuliers"></a>
        </li>
         <li>
          <a href="#" class="pretty-link text-secondary">Locataire en place</a>
        </li>
      </ul>

      <ul data-list="swiper-professionnels" class="swiper-list swiper-list-alternative swiper-list-middle list-no-padding list-spaced list-no-style" role="navigation">
        <li class="swiper-back visible-xs visible-sm">
          <a href="swiper-main" class="retraitespopulaires-icon retraitespopulaires-icon-arrow-thin arrow arrow-back arrow-small arrow-flip arrow-particuliers"></a>
          <a href="#" class="text-muted pretty-link pretty-link-light-gray text-primary text-secondary">Professionnels</a>
        </li>
        <li>
          <a href="#" class="pretty-link text-secondary">Prévoyance professionnelle</a>
        </li>
        <li>
          <a href="#" class="pretty-link text-secondary">Location de local commercial</a>
        </li>
      </ul>

       <ul data-list="swiper-collectivites" class="swiper-list swiper-list-alternative swiper-list-middle list-no-padding list-spaced list-no-style" role="navigation">
        <li class="swiper-back visible-xs visible-sm">
          <a href="swiper-main" class="retraitespopulaires-icon retraitespopulaires-icon-arrow-thin arrow arrow-back arrow-small arrow-flip arrow-particuliers"></a>
          <a href="#" class="text-muted pretty-link pretty-link-light-gray text-primary text-secondary">Collectivités</a>
        </li>
        <li>
          <a href="#" class="pretty-link text-secondary">Gestion d'institutions de prévoyance</a>
        </li>
        <li>
          <a href="#" class="pretty-link text-secondary">Financement d'infrastructures</a>
        </li>
        <li>
          <a href="#" class="pretty-link text-secondary">Construction de logements</a>
        </li>
      </ul>

      <ul data-list="swiper-assurance-vie" class="swiper-list swiper-list-alternative swiper-list-middle list-no-padding list-spaced list-no-style" role="navigation">
        <li class="swiper-back visible-xs visible-sm">
          <a href="swiper-main" class="retraitespopulaires-icon retraitespopulaires-icon-arrow-thin arrow arrow-back arrow-small arrow-flip arrow-assurance"></a>
          <a href="/retraitespopulaires-styleguide/assurance-vie" class="text-muted pretty-link pretty-link-light-gray text-assurance">Assurance vie</a>
        </li>
        <li>
          <a href="/retraitespopulaires-styleguide/rp-jeune" class="pretty-link text-assurance">RP Rente immédiate</a>
        </li>
        <li>
          <a href="/retraitespopulaires-styleguide/rp-jeune" class="pretty-link text-assurance">RP Rente immédiate certaine</a>
        </li>
        <li>
          <a href="/retraitespopulaires-styleguide/rp-jeune" class="pretty-link text-assurance">RP Rente différée</a>
        </li>
        <li>
          <a href="/retraitespopulaires-styleguide/rp-jeune" class="pretty-link text-assurance">RP Jeune</a>
        </li>
        <li>
          <a href="/retraitespopulaires-styleguide/rp-jeune" class="pretty-link text-assurance">RP Duo primes périodiques</a>
        </li>
        <li>
          <a href="/retraitespopulaires-styleguide/rp-jeune" class="pretty-link text-assurance">RP RDuo prime unique</a>
        </li>
        <li>
          <a href="/retraitespopulaires-styleguide/rp-jeune" class="pretty-link text-assurance">RP Épargne</a>
        </li>
        <li>
          <a href="/retraitespopulaires-styleguide/rp-jeune" class="pretty-link text-assurance">RP Refuge</a>
        </li>
        <li>
          <a href="/retraitespopulaires-styleguide/rp-jeune" class="pretty-link text-assurance">RP Sécurifonds</a>
        </li>
      </ul>

      <ul data-list="swiper-prevoyance" class="swiper-list swiper-list-alternative swiper-list-middle list-no-padding list-spaced list-no-style" role="navigation">
        <li class="swiper-back visible-xs visible-sm">
          <a href="swiper-main" class="retraitespopulaires-icon retraitespopulaires-icon-arrow-thin arrow arrow-back arrow-small arrow-flip arrow-prevoyance"></a>
          <a href="#" class="text-muted pretty-link pretty-link-light-gray text-prevoyance">Prévoyance professionnel</a>
        </li>
        <li>
          <a href="#" class="pretty-link text-prevoyance">Pour les entreprises</a>
          <a aria-label="Cliquez pour ouvrir le sous-menu" href="swiper-prevoyance-entreprises" class="retraitespopulaires-icon retraitespopulaires-icon-arrow-thin arrow arrow-next arrow-small arrow-prevoyance"></a>
        </li>
        <li>
          <a href="#" class="pretty-link text-prevoyance">Pour les institutions de prévoyance</a>
          <a href="swiper-prevoyance-institutions" class="retraitespopulaires-icon retraitespopulaires-icon-arrow-thin arrow arrow-next arrow-small arrow-prevoyance"></a>
        </li>
        <li>
          <a href="#" class="pretty-link text-prevoyance">Pour les particuliers</a>
          <a href="swiper-prevoyance-particuliers" class="retraitespopulaires-icon retraitespopulaires-icon-arrow-thin arrow arrow-next arrow-small arrow-prevoyance"></a>
        </li>
      </ul>

      <ul data-list="swiper-immobilier" class="swiper-list swiper-list-alternative swiper-list-middle list-no-padding list-spaced list-no-style" role="navigation">
        <li class="swiper-back visible-xs visible-sm">
          <a href="swiper-main" class="retraitespopulaires-icon retraitespopulaires-icon-arrow-thin arrow arrow-back arrow-small arrow-flip arrow-immobilier"></a>
          <a href="#" class="text-muted pretty-link pretty-link-light-gray text-immobilier">Immobilier</a>
        </li>
        <li>
          <a href="#" class="pretty-link text-immobilier">Louer</a>
          <a href="swiper-immobilier-louer" class="retraitespopulaires-icon retraitespopulaires-icon-arrow-thin arrow arrow-next arrow-small arrow-immobilier"></a>
        </li>
        <li>
          <a href="#" class="pretty-link text-immobilier">Espace du locataire</a>
          <a href="swiper-immobilier-locataire" class="retraitespopulaires-icon retraitespopulaires-icon-arrow-thin arrow arrow-next arrow-small arrow-immobilier"></a>
        </li>
        <li>
          <a href="#" class="pretty-link text-immobilier">Parc immobilier</a>
          <a href="swiper-immobilier-parc" class="retraitespopulaires-icon retraitespopulaires-icon-arrow-thin arrow arrow-next arrow-small arrow-immobilier"></a>
        </li>
        <li>
          <a href="#" class="pretty-link text-immobilier">Vendre</a>
        </li>
      </ul>

      <ul data-list="swiper-hypotheque" class="swiper-list swiper-list-alternative swiper-list-middle list-no-padding list-spaced list-no-style" role="navigation">
        <li class="swiper-back visible-xs visible-sm">
          <a href="swiper-main" class="retraitespopulaires-icon retraitespopulaires-icon-arrow-thin arrow arrow-back arrow-small arrow-flip arrow-hypotheque"></a>
          <a href="#" class="text-muted pretty-link pretty-link-light-gray text-hypotheque">Financement</a>
        </li>
        <li>
          <a href="#" class="pretty-link text-hypotheque">Prêt hypothécaire</a>
          <a href="swiper-hypotheque-pret" class="retraitespopulaires-icon retraitespopulaires-icon-arrow-thin arrow arrow-next arrow-small arrow-hypotheque"></a>
        </li>
        <li>
          <a href="#" class="pretty-link text-hypotheque">Crédit de construction</a>
          <a href="swiper-hypotheque-credit" class="retraitespopulaires-icon retraitespopulaires-icon-arrow-thin arrow arrow-next arrow-small arrow-hypotheque"></a>
        </li>
        <li>
          <a href="#" class="pretty-link text-hypotheque">Prêt sur police</a>
        </li>
        <li>
          <a href="#" class="pretty-link text-hypotheque">Prêts aux collectivités</a>
        </li>
      </ul>

    </div>
  </div>
  <div class="swiper-column-wrapper swiper-column-wrapper-3 col-xs-12 col-md-4">
    <div class="swiper-column swiper-column-3 swiper-column-waiting">
      <ul data-list="swiper-particulier-fortune" class="swiper-list swiper-list-alternative swiper-list-last list-no-padding list-spaced list-no-style" role="navigation">
        <li class="swiper-back visible-xs visible-sm">
          <a href="swiper-main" class="retraitespopulaires-icon retraitespopulaires-icon-arrow-thin arrow arrow-back arrow-small arrow-flip arrow-particuliers"></a>
          <a href="#" class="text-muted pretty-link pretty-link-light-gray text-particuliers">Fortune</a>
        </li>
        <li>
          <a href="#" class="pretty-link text-particuliers">Épargner</a>
        </li>
        <li>
          <a href="#" class="pretty-link text-particuliers">Payer moins d'impôts</a>
        </li>
        <li>
          <a href="#" class="pretty-link text-particuliers">Faire fructifier un patrimoine</a>
        </li>
        <li>
          <a href="#" class="pretty-link text-particuliers">Vendre un bien immobilier</a>
        </li>
      </ul>

      <ul data-list="swiper-particulier-retraite" class="swiper-list swiper-list-alternative swiper-list-last list-no-padding list-spaced list-no-style" role="navigation">
        <li class="swiper-back visible-xs visible-sm">
          <a href="swiper-main" class="retraitespopulaires-icon retraitespopulaires-icon-arrow-thin arrow arrow-back arrow-small arrow-flip arrow-particuliers"></a>
          <a href="#" class="text-muted pretty-link text-particuliers">Retraite</a>
        </li>
        <li>
          <a href="#" class="pretty-link text-particuliers">Préparer la retraite</a>
        </li>
        <li>
          <a href="#" class="pretty-link text-particuliers">Profiter de la retraite</a>
        </li>
        <li>
          <a href="#" class="pretty-link text-particuliers">Succession</a>
        </li>
      </ul>

      <ul data-list="swiper-particulier-travail" class="swiper-list swiper-list-alternative swiper-list-last list-no-padding list-spaced list-no-style" role="navigation">
        <li class="swiper-back visible-xs visible-sm">
          <a href="swiper-main" class="retraitespopulaires-icon retraitespopulaires-icon-arrow-thin arrow arrow-back arrow-small arrow-flip arrow-particuliers"></a>
          <a href="#" class="text-muted pretty-link text-particuliers">Travail</a>
        </li>
        <li>
          <a href="#" class="pretty-link text-particuliers">Premier emploi</a>
        </li>
        <li>
          <a href="#" class="pretty-link text-particuliers">Transiter entre deux emplois</a>
        </li>
        <li>
          <a href="#" class="pretty-link text-particuliers">Indépendants</a>
        </li>
        <li>
          <a href="#" class="pretty-link text-particuliers">Louer un local commercial</a>
        </li>
        <li>
          <a href="#" class="pretty-link text-particuliers">Prévoyance professionnelle des employés</a>
        </li>
      </ul>

      <ul data-list="swiper-particulier-famille" class="swiper-list swiper-list-alternative swiper-list-last list-no-padding list-spaced list-no-style" role="navigation">
        <li class="swiper-back visible-xs visible-sm">
          <a href="swiper-main" class="retraitespopulaires-icon retraitespopulaires-icon-arrow-thin arrow arrow-back arrow-small arrow-flip arrow-particuliers"></a>
          <a href="/retraitespopulaires-styleguide/famille" class="text-muted pretty-link text-particuliers">Famille</a>
        </li>
        <li>
          <a href="/retraitespopulaires-styleguide/rp-jeune" class="pretty-link text-particuliers">Avenir des enfants</a>
        </li>
        <li>
          <a href="#" class="pretty-link text-particuliers">Protéger les proches</a>
        </li>
        <li>
          <a href="#" class="pretty-link text-particuliers">Succession</a>
        </li>
      </ul>

       <ul data-list="swiper-particulier-logement" class="swiper-list swiper-list-alternative swiper-list-last list-no-padding list-spaced list-no-style" role="navigation">
        <li class="swiper-back visible-xs visible-sm">
          <a href="swiper-main" class="retraitespopulaires-icon retraitespopulaires-icon-arrow-thin arrow arrow-back arrow-small arrow-flip arrow-particuliers"></a>
          <a href="#" class="text-muted pretty-link text-particuliers">Logement</a>
        </li>
        <li>
          <a href="#" class="pretty-link text-particuliers">Louer un appartement</a>
        </li>
        <li>
          <a href="#" class="pretty-link text-particuliers">Acheter un logement</a>
        </li>
        <li>
          <a href="#" class="pretty-link text-particuliers">Vendre un bien immobilier</a>
        </li>
      </ul>

      <ul data-list="swiper-particulier-3pilier" class="swiper-list swiper-list-alternative swiper-list-last list-no-padding list-spaced list-no-style" role="navigation">
        <li class="swiper-back visible-xs visible-sm">
          <a href="swiper-main" class="retraitespopulaires-icon retraitespopulaires-icon-arrow-thin arrow arrow-back arrow-small arrow-flip arrow-particuliers"></a>
          <a href="#" class="text-muted pretty-link text-particuliers">Assuré 3e pilier</a>
        </li>
        <li>
          <a href="#" class="pretty-link text-particuliers">Attestations pour impôts</a>
        </li>
        <li>
          <a href="#" class="pretty-link text-particuliers">Décès</a>
        </li>
        <li>
          <a href="#" class="pretty-link text-particuliers">Invalidité</a>
        </li>
      </ul>

      <ul data-list="swiper-prevoyance-entreprises" class="swiper-list swiper-list-alternative swiper-list-last list-no-padding list-spaced list-no-style" role="navigation">
        <li class="swiper-back visible-xs visible-sm">
          <a href="swiper-main" class="retraitespopulaires-icon retraitespopulaires-icon-arrow-thin arrow arrow-back arrow-small arrow-flip arrow-prevoyance"></a>
          <a href="#" class="text-muted pretty-link text-prevoyance">Pour les entreprises</a>
        </li>
        <li>
          <a href="#" class="pretty-link text-prevoyance">Assurer les employés</a>
        </li>
        <li>
          <a href="#" class="pretty-link text-prevoyance">Plans complémentaires</a>
        </li>
        <li>
          <a href="#" class="pretty-link text-prevoyance">Associations professionnelles</a>
        </li>
      </ul>

      <ul data-list="swiper-prevoyance-institutions" class="swiper-list swiper-list-alternative swiper-list-last list-no-padding list-spaced list-no-style" role="navigation">
        <li class="swiper-back visible-xs visible-sm">
          <a href="swiper-main" class="retraitespopulaires-icon retraitespopulaires-icon-arrow-thin arrow arrow-back arrow-small arrow-flip arrow-prevoyance"></a>
          <a href="#" class="text-muted pretty-link text-prevoyance">Pour les institutions de prévoyance</a>
        </li>
        <li>
          <a href="#" class="pretty-link text-prevoyance">Gestion de mandats</a>
        </li>
        <li>
          <a href="#" class="pretty-link text-prevoyance">Diagnostic gratuit</a>
        </li>
      </ul>

      <ul data-list="swiper-prevoyance-particuliers" class="swiper-list swiper-list-alternative swiper-list-last list-no-padding list-spaced list-no-style" role="navigation">
        <li class="swiper-back visible-xs visible-sm">
          <a href="swiper-main" class="retraitespopulaires-icon retraitespopulaires-icon-arrow-thin arrow arrow-back arrow-small arrow-flip arrow-prevoyance"></a>
          <a href="#" class="text-muted pretty-link text-prevoyance">Pour les particuliers</a>
        </li>
        <li>
          <a href="#" class="pretty-link text-prevoyance">Déjà assuré ?</a>
        </li>
        <li>
          <a href="#" class="pretty-link text-prevoyance">Indépendants</a>
        </li>
        <li>
          <a href="#" class="pretty-link text-prevoyance">Transiter entre deux emplois</a>
        </li>
      </ul>

      <ul data-list="swiper-immobilier-louer" class="swiper-list swiper-list-alternative swiper-list-last list-no-padding list-spaced list-no-style" role="navigation">
        <li class="swiper-back visible-xs visible-sm">
          <a href="swiper-main" class="retraitespopulaires-icon retraitespopulaires-icon-arrow-thin arrow arrow-back arrow-small arrow-flip arrow-immobilier"></a>
          <a href="#" class="text-muted pretty-link text-immobilier">Louer</a>
        </li>
        <li>
          <a href="#" class="pretty-link text-immobilier">Appartements</a>
        </li>
        <li>
          <a href="#" class="pretty-link text-immobilier">Commerces</a>
        </li>
        <li>
          <a href="#" class="pretty-link text-immobilier">Places de parc</a>
        </li>
        <li>
          <a href="#" class="pretty-link text-immobilier">Nouvelles constructions</a>
        </li>
      </ul>

      <ul data-list="swiper-immobilier-locataire" class="swiper-list swiper-list-alternative swiper-list-last list-no-padding list-spaced list-no-style" role="navigation">
        <li class="swiper-back visible-xs visible-sm">
          <a href="swiper-main" class="retraitespopulaires-icon retraitespopulaires-icon-arrow-thin arrow arrow-back arrow-small arrow-flip arrow-immobilier"></a>
          <a href="#" class="text-muted pretty-link text-immobilier">Espace du locataire</a>
        </li>
        <li>
          <a href="#" class="pretty-link text-immobilier">Assistance technique</a>
        </li>
        <li>
          <a href="#" class="pretty-link text-immobilier">Loyer</a>
        </li>
        <li>
          <a href="#" class="pretty-link text-immobilier">Situation personnelle</a>
        </li>
        <li>
          <a href="#" class="pretty-link text-immobilier">Sécurité</a>
        </li>
        <li>
          <a href="#" class="pretty-link text-immobilier">Déchets</a>
        </li>
      </ul>

      <ul data-list="swiper-immobilier-parc" class="swiper-list swiper-list-alternative swiper-list-last list-no-padding list-spaced list-no-style" role="navigation">
        <li class="swiper-back visible-xs visible-sm">
          <a href="swiper-main" class="retraitespopulaires-icon retraitespopulaires-icon-arrow-thin arrow arrow-back arrow-small arrow-flip arrow-immobilier"></a>
          <a href="#" class="text-muted pretty-link pretty-link-light-gray text-immobilier">Parc immobilier</a>
        </li>
        <li>
          <a href="#" class="pretty-link text-immobilier">Constructions en cours</a>
        </li>
        <li>
          <a href="#" class="pretty-link text-immobilier">Constructions terminées</a>
        </li>
      </ul>

      <ul data-list="swiper-hypotheque-pret" class="swiper-list swiper-list-alternative swiper-list-last list-no-padding list-spaced list-no-style" role="navigation">
        <li class="swiper-back visible-xs visible-sm">
          <a href="swiper-main" class="retraitespopulaires-icon retraitespopulaires-icon-arrow-thin arrow arrow-back arrow-small arrow-flip arrow-hypotheque"></a>
          <a href="#" class="text-muted pretty-link pretty-link-light-gray text-hypotheque">Prêt hypothécaire</a>
        </li>
        <li>
          <a href="#" class="pretty-link text-hypotheque">Calculateur d'hypothèque</a>
        </li>
        <li>
          <a href="#" class="pretty-link text-hypotheque">Taux hypothécaires</a>
        </li>
      </ul>

      <ul data-list="swiper-hypotheque-credit" class="swiper-list swiper-list-alternative swiper-list-last list-no-padding list-spaced list-no-style" role="navigation">
        <li class="swiper-back visible-xs visible-sm">
          <a href="swiper-main" class="retraitespopulaires-icon retraitespopulaires-icon-arrow-thin arrow arrow-back arrow-small arrow-flip arrow-hypotheque"></a>
          <a href="#" class="text-muted pretty-link pretty-link-light-gray text-hypotheque">Crédit de construction</a>
        </li>
        <li>
          <a href="#" class="pretty-link text-hypotheque">Taux</a>
        </li>
      </ul>
    </div>
  </div>
</div>
