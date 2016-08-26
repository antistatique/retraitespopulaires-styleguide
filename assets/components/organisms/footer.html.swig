---
title: footer
name: footer
collection: organisms
notes: |
  ##### Usage : `footer`
---
<div class="footer">
  <div class="row">
    <div class="col-xs-6">
      <div class="spacer"></div>
      <h2>Contactez-nous</h2>
      <div class="spacer spacer-sm"></div>
      <div class="text-large text-cocon text-bold"><a href="tel:+41213482111">021 348 21 11</a></div>
      <div class="text-large text-cocon text-bold"><a href="mailto:info@retraitespopulaires.ch">info@retraitespopulaires.ch</a></div>
      <div class="spacer"></div>

      <h4>Agences</h4>
      <ul class="list-no-style">
        <li>
          Lausanne <a class="pull-right" href="tel:+41213482111">021 348 <strong>21 11</strong></a>
        </li>
        <li>
          Yverdon-les-bains <a class="pull-right" href="tel:+41213482821">021 348 <strong>28 21</strong></a>
        </li>
        <li>
          Nyon <a class="pull-right" href="tel:+41213482020">021 348 <strong>20 20</strong></a>
        </li>
      </ul>
    </div>

    <div class="col-xs-12">
      <div class="spacer"></div>
      <h3>Retrouvez-nous sur les réseaux sociaux</h3>
      <div class="spacer spacer-sm"></div>
      {% include '../atoms/socials.html.swig' %}
      <div class="spacer"></div>
    </div>
  </div>
</div>
