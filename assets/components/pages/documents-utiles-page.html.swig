---
title: Documents utiles page
name: documents-utiles-page
collection: pages
styleguide: false
layout: page.html.swig
---
{% include '../organisms/header.html.swig' %}

<div class="container-fluid main-wrapper">
  <div class="row">
    <div class="col-xs-12 col-md-7 col-md-push-4 col-lg-8 col-lg-push-3 col-xl-8 col-xl-push-2">
      <a name="startcontent"></a>
      <article class="page full clearfix">
        <div class="content">
          <div class="row">
            <div class="col-xs-12 col-lg-10 col-lg-offset-1 col-xl-8 col-xl-offset-2">
              {% include '../molecules/breadcrumb.html.swig' %}
              <div class="spacer spacer-xs"></div>
              <h1 class="page-title">Documents utiles</h1>
              <div class="entity-body clearfix">
                <p class="lead text-secondary">Trois, deux, un, téléchargez!</p>
                <p>Accédez d'un coup à tous les documents que Retraites Populaires vous propose à différents endroits de son site.</p>
              </div>
              {% include '../molecules/document-filters.html.swig' %}
              <div class="spacer spacer-md"></div>
              <div class="spacer spacer-md"></div>
              <section class="document-card-list-section">
                <div class="document-card-list-bg"></div>
                <div class="spacer spacer-md"></div>
                <h2 class="h5">Résultats</h2>
                <div class="document-card-list">
                  {% include '../molecules/document-card.html.swig' %}
                  {% include '../molecules/document-card.html.swig' %}
                  {% include '../molecules/document-card.html.swig' %}
                  {% include '../molecules/document-card.html.swig' %}
                  {% include '../molecules/document-card.html.swig' %}
                </div>
                <div class="spacer spacer-md"></div>
                <div class="row">
                  <div class="col-xs-10 col-xs-offset-1 text-center">
                    <h4 id="pagination-heading" class="visually-hidden hidden">Pagination</h4>
                    <nav aria-label="Pagination">
                      <ul class="pagination">
                        <li class="active">
                          <a class="btn btn-outline btn-primary btn-circle use-ajax" href="#" title="Page courante">
                          <span class="sr-only">Page courante</span>1</a>
                        </li>
                        <li>
                          <a class="btn btn-outline btn-primary btn-circle use-ajax" href="#" title="Aller à la page 2">
                          <span class="sr-only">Page</span>2</a>
                        </li>
                        <li>
                          <a class="btn btn-outline btn-primary btn-circle use-ajax" href="#" title="Aller à la page 3">
                          <span class="sr-only">Page</span>3</a>
                        </li>
                        <li>
                          <a href="#" class="btn btn-outline btn-primary btn-circle use-ajax" title="Aller à la page suivante" rel="next">
                          <span aria-hidden="true" class="retraitespopulaires-icon retraitespopulaires-icon-arrow-thin"></span>
                          <span class="sr-only">Page suivante</span>
                          </a>
                        </li>
                      </ul>
                    </nav>
                    <div class="spacer spacer-md"></div>
                  </div>
                </div>
              </section>
              <div class="spacer spacer-md"></div>
            </div>
          </div>
        </div>
      </article>
    </div>
    <div class="col-xs-12 col-md-4 col-md-pull-7 col-lg-3 col-lg-pull-8 col-xl-2 col-xl-pull-8">
      {% include '../molecules/secondary-nav.html.swig' %}
    </div>
  </div>
</div>

<div class="spacer spacer-md"></div>

<div id="contactez-nous" class="section contact-section bg-berrylight-gray">
  <div class="container">
    <div class="section-title">
      <h2>Retraites&nbsp;Populaires est à votre disposition</h2>
    </div>
    <div class="row">
      <div class="col-md-10 col-md-offset-1 col-lg-8 col-lg-offset-2">
        <div class="card card-horizontal card-white">
          <a href="#" class="card-img-top">
            <div class="card-img-bg" style="background-image:url(https://www.retraitespopulaires.ch/sites/default/files/styles/rp_teaser_contact_xl/public/2016-10/Retraites-Populaires.png?h=c9b3df4f&amp;itok=BATvdfLG);"></div>
          </a>
          <div class="card-body">
            <p class="sr-only">Information de contact pour Retraites Populaires</p>
            <h3 class="card-title">
              <a href="#">Retraites Populaires</a>
            </h3>
            <p>N'hésitez pas à nous contacter                    au <a class="pretty-link text-bold text-no-wrap" href="tel:0213482111">021 348 21 11</a>.</p>
            <p>
              <a href="#" class="btn btn-primary">Contacter</a>
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
  {% include '../molecules/popin.html.swig' %}
</div>

<div class="spacer"></div>

<div class="section bg-berrylight-gray">
  <div class="container">
    <div class="section-title">
      <h2>Actualités</h2>
      <div>
        <a href="/a-propos/actualites" class="pretty-link pretty-link-berrylight-gray">Voir toutes les actualités</a>
      </div>
    </div>
    <div class="row last-news-content same-height-group">
      <div class="col-xs-12 col-md-6 same-height">
        <a href="/a-propos/actualites/les-assurances-sociales-en-bref" class="card card-white">
          <div class="card-img-top">
            <img class="card-img" src="https://retraitespopulaires.ch/sites/default/files/styles/rp_image_700_350/public/covers-faq/2019-09/bandeau%20actualit%C3%A9.png?h=abc3698d&amp;itok=7OJx5zdl" alt="Les assurances sociales en bref...">
            <div class="loader-image">
              <div class="loader">
                <div class="loader-snake"></div>
              </div>
            </div>
          </div>
          <div class="card-body">
            <h3 class="card-title h2">Les assurances sociales en bref...</h3>
            <div class="text-muted">
              <time datetime="2019-10-16T11:30:00+02:00">
              <span class="sr-only">Date de publication:</span>
              16 octobre 2019
              </time> -
              <span>
              <span class="sr-only">Catégorie de l'actualité:</span>
              Infos
              </span>
            </div>
            <div class="spacer spacer-sm"></div>
            <p>Tu as des questions concernant les assurances sociales ? Quelques notions t'échappent ? Alors cette actualité est faite pour toi. </p>
          </div>
        </a>
      </div>
      <div class="col-xs-12 col-md-6 same-height">
        <a href="/a-propos/actualites/comment-profiter-de-sa-retraite-deux" class="card card-white">
          <div class="card-img-top">
            <img class="card-img" src="https://retraitespopulaires.ch/sites/default/files/styles/rp_image_700_350/public/covers-faq/2019-10/Profiter%20de%20sa%20retraite.png?h=abc3698d&amp;itok=e2Rdp1px" alt="Comment profiter de sa retraite à deux?">
            <div class="loader-image">
              <div class="loader">
                <div class="loader-snake"></div>
              </div>
            </div>
          </div>
          <div class="card-body">
            <h3 class="card-title h2">Comment profiter de sa retraite à deux?</h3>
            <div class="text-muted">
              <time datetime="2019-10-09T08:28:51+02:00">
              <span class="sr-only">Date de publication:</span>
              09 octobre 2019
              </time> -
              <span>
              <span class="sr-only">Catégorie de l'actualité:</span>
              Dans les médias
              </span>
            </div>
            <div class="spacer spacer-sm"></div>
            <p>Louise et Victor, 58 et 60 ans, réfléchissent à conclure un 3e pilier. Ils souhaitent en effet investir une partie de leur épargne pour améliorer leur retraite et se demandent quelles sont leurs options.
              Chez Retraites Populaires, nous assurons la prévoyance de nos clients depuis plus de 110 ans et les aidons à trouver la solution adaptée à leur situation. Louise et Victor sont donc venus nous demander conseil et obtenir des réponses concrètes.
            </p>
          </div>
        </a>
      </div>
    </div>
  </div>
</div>

<div class="spacer"></div>
{% include '../organisms/footer.html.swig' %}
