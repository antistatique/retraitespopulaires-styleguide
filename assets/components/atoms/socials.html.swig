---
title: socials
name: socials
collection: atoms
notes: |
  ##### Usage : `socials`
  - **socials_theme** - <i>String</i> - <b>form-control-['assurance'|'prevoyance'|'immobilier'|'hypotheque'|'institutionnel'|'profelia'|'cpev'|'cip']</b>
  Other availables classes includes:
  - `.retraitespopulaires-icon-dark` <i>(Dark & monochromatique)</i>
  - `.retraitespopulaires-icon-brand` <i>(Retraites Populaires branded green)</i>
  - `.retraitespopulaires-icon-color` <i>(Takes the branded color of the social network)</i>
---
<ul class="social-list list-no-style list-inline">
  <li>
    <a aria-label="Cliquez pour accéder au compte Twitter de Retraites Populaires" href="https://twitter.com/RetraitesPop" target="_blank"><i class="retraitespopulaires-icon retraitespopulaires-icon-2x retraitespopulaires-icon-twitter retraitespopulaires-icon-{{ socials_theme|default('primary') }}" aria-hidden="true"></i></a>
  </li>
  <li>
    <a aria-label="Cliquez pour accéder au compte Facebook de Retraites Populaires" href="https://www.facebook.com/retraitespopulaires" target="_blank">
      <i class="retraitespopulaires-icon retraitespopulaires-icon-2x retraitespopulaires-icon-facebook retraitespopulaires-icon-{{ socials_theme|default('primary') }}" aria-hidden="true"></i>
    </a>
  </li>
  <li>
    <a aria-label="Cliquez pour accéder au compte LinkedIn de Retraites Populaires" href="https://www.linkedin.com/company/retraites-populaires" target="_blank">
      <i class="retraitespopulaires-icon retraitespopulaires-icon-2x retraitespopulaires-icon-linkedin retraitespopulaires-icon-{{ socials_theme|default('primary') }}" aria-hidden="true"></i>
    </a>
  </li>
  <li>
    <a aria-label="Cliquez pour accéder au compte Youtube de Retraites Populaires" href="https://www.youtube.com/user/RetraitesPopulaires" target="_blank">
      <i class="retraitespopulaires-icon retraitespopulaires-icon-2x retraitespopulaires-icon-youtube retraitespopulaires-icon-{{ socials_theme|default('primary') }}" aria-hidden="true"></i>
    </a>
  </li>
  <li>
    <a aria-label="Cliquez pour accéder au compte Instagram de Retraites Populaires" href="https://www.instagram.com/retraitespopulaires" target="_blank">
      <i class="retraitespopulaires-icon retraitespopulaires-icon-2x retraitespopulaires-icon-instagram retraitespopulaires-icon-{{ socials_theme|default('primary') }}" aria-hidden="true"></i>
    </a>
  </li>
</ul>
