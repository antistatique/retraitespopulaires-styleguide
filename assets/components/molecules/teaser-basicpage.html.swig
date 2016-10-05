---
title: teaser-basicpage
name: teaser-basicpage
collection: molecules
notes: |
  ##### Usage : `teaser-basicpage`
  ##### Options :
  - **icon** - Boolean
  - **title** - String
  - **links** - Array
  - **body** - String
---
<div class="teaser-basicpage shadow shadow-down">
  <div class="basicpage-heading">
    <div class="text-primary icon-text icon-text-center">
    {% if icon %}
      <span class="retraitespopulaires-icon retraitespopulaires-icon-placeholder retraitespopulaires-icon-2x"></span>
      <a href="#" class="icon-text-txt text-cocon h4">{{ title }}</a>
    {% else %}
      <a href="#" class="text-cocon h4">{{ title }}</a>
    {% endif %}
    </div>
  </div>
  <div class="basicpage-body">
    {% if body %}
      <p>{{ body }}</p>
    {% else %}
      <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.</p>
    {% endif %}
    {% if links %}
      <ul class="facets-list">
        {% for link in links %}
          <li><a href="#" class="pretty-link">{{ link }}</a></li>
        {% endfor %}
      </ul>
    {% endif %}
  </div>
</div>
