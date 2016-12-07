---
title: teaser-basicpage
name: teaser-basicpage
collection: molecules
notes: |
  ##### Usage : `teaser-basicpage`
  ##### Options :
  - **icon** - <i>Boolean</i>
  - **title_basicpage** - <i>String</i>
  - **links_basicpage** - <i>Array</i>
  - **body_basicpage** - <i>String</i>
  - **theme_basicpage** - <i>String</i> - <b>teaser-basicpage-['assurance'|'prevoyance'|'immobilier'|'hypotheque'|'institutionnel'|'profelia'|'cpev'|'cip']</b>
---
<div class="teaser-basicpage teaser-basicpage-{{ theme_basicpage }} shadow shadow-down">
  <div class="basicpage-heading">
    <div class="text-primary {% if icon %} icon-text icon-text-center {% endif %}">
    {% if icon %}
      <span class="retraitespopulaires-icon retraitespopulaires-icon-placeholder retraitespopulaires-icon-2x"></span>
      <a href="#" class="icon-text-txt text-cocon h4">{{ title_basicpage|default('Lorem Ipsum') }}</a>
    {% else %}
      <a href="#" class="text-cocon text-{{ theme_basicpage }} h4">{{ title_basicpage|default('Lorem Ipsum') }}</a>
    {% endif %}
    </div>
  </div>
  <div class="basicpage-body">
    <p>{{ body_basicpage|default('Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.') }}</p>
    {% if links_basicpage %}
      <ul class="facets-list">
        {% for link in links_basicpage %}
          <li><a href="#" class="pretty-link">{{ link }}</a></li>
        {% endfor %}
      </ul>
    {% endif %}
  </div>
</div>
