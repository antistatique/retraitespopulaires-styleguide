---
title: attachments-job
name: attachments-job
collection: organisms
notes: |
  ##### Usage : `attachments-job`
  - **attachments_job_theme** - <i>String</i> - <b>['assurance'|'prevoyance'|'immobilier'|'hypotheque'|'institutionnel'|'profelia'|'cpev'|'cip']</b>
---
<div class="attachements-wrapper attachements-wrapper-job">
  <div class="container">
    <div class="row">
      <div class="col-xs-10 col-xs-offset-1">
        <div class="card-attachement card-attachement shadow shadow-down">
          <div class="card-title h2">Emplois</div>
          <div class="row">
            <div class="card-content">
            <div class="col-xs-12 col-md-4">
              <p>
                Que serait Retraites Populaires sans ses collaborateurs?<br /><br />Nous cherchons actuellement…
              </p>
            </div>
            <div class="col-xs-12 col-md-8">
              <ul class="list-spaced list-unstyled">
                <li class="">
                  <div class="media">
                    <div class="media-left">
                      <a href="#" class="retraitespopulaires-icon retraitespopulaires-icon-document-file retraitespopulaires-icon-3x text-{{ attachments_job_theme }}"></a>
                    </div>
                    <div class="media-body">
                      <a href="#" class="pretty-link h5 text-{{ attachments_job_theme }}">Stagiaire MPC post-CFC à Lausanne</a>
                    </div>
                  </div>
                </li>
                <li class="">
                  <div class="media">
                    <div class="media-left">
                      <a href="#" class="retraitespopulaires-icon retraitespopulaires-icon-document-file retraitespopulaires-icon-3x text-{{ attachments_job_theme }}"></a>
                    </div>
                    <div class="media-body">
                      <a href="#" class="pretty-link h5 text-{{ attachments_job_theme }}">Stagiaire MPC post-CFC à Lausanne</a>
                    </div>
                  </div>
                </li>
                <li class="">
                  <div class="media">
                    <div class="media-left">
                      <a href="#" class="retraitespopulaires-icon retraitespopulaires-icon-document-file retraitespopulaires-icon-3x text-{{ attachments_job_theme }}"></a>
                    </div>
                    <div class="media-body">
                      <a href="#" class="pretty-link h5 text-{{ attachments_job_theme }}">Stagiaire MPC post-CFC à Lausanne</a>
                    </div>
                  </div>
                </li>
              </ul>
            </div>
            </div>
          </div>

          <div class="card-footer">
            <div class="icon-text icon-text-center">
              <span class="retraitespopulaires-icon retraitespopulaires-icon-arrow-thin retraitespopulaires-icon-2x text-primary text-{{ attachments_job_theme }}"></span>
              <a class="icon-text-txt text-bold pretty-link pretty-link-berrylight-gray h5 text-{{ attachments_job_theme }}" href="#">Voir tous les emplois</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  {% include '../atoms/organic-lines.html.swig' %}
</div>
