---
title: teaser-basicpage
name: teaser-basicpage
collection: molecules
notes: |
  ##### Usage : `teaser-basicpage`
  ##### Options :
  - **basicpage_icon** - <i>Boolean</i>
  - **basicpage_title** - <i>String</i>
  - **basicpage_links** - <i>Array</i>
  - **basicpage_body** - <i>String</i>
  - **basicpage_theme** - <i>String</i> - <b>teaser-basicpage-['assurance'|'prevoyance'|'immobilier'|'hypotheque'|'institutionnel'|'profelia'|'cpev'|'cip']</b>
---
<div class="teaser-basicpage teaser-basicpage-{{ basicpage_theme }} shadow shadow-down">
  <div class="basicpage-heading">
<div class="text-primary {% if basicpage_icon %} icon-text icon-text-center {% endif %}">
    {% if basicpage_icon %}
      <span class="retraitespopulaires-icon retraitespopulaires-icon-placeholder retraitespopulaires-icon-2x"></span>
      <a href="#" class="icon-text-txt text-cocon h4">{{ basicpage_title|default('Lorem Ipsum') }}</a>
    {% else %}
      <a href="#" class="text-cocon text-{{ basicpage_theme }} h4">{{ basicpage_title|default('Lorem Ipsum') }}</a>
    {% endif %}
    </div>
  </div>
  <div class="basicpage-body">
    {% if basicpage_body %}
      <p>{{ basicpage_body }}</p>
    {% endif %}
    {% if basicpage_links %}
      <ul class="facets-list">
        {% for link in basicpage_links %}
          <li><a href="#" class="pretty-link">{{ link }}</a></li>
        {% endfor %}
      </ul>
    {% endif %}
  </div>
</div>
