---
title: teaser-search
name: teaser-search
collection: molecules
notes: |
  ##### Usage : `teaser-search`
  ##### Options :
  - **title_search** - <i>String</i>
  - **type_search** - <i>String</i>
  - **link_search** - <i>String</i>
  - **body_search** - <i>String</i>
---
<a href="{{ link_search|default('#') }}" class="teaser teaser-fullclick teaser-search shadow shadow-down">
  <div class="search-heading">
    <div class="text-primary">
      <div class="text-cocon h4">{{ title_search|default('Lorem Ipsum') }}</div>
      <div class="spacer spacer-xs"></div>
      <div class="text-cocon h6 text-muted">{{ type_search|default('Dolore')|upper }}</div>
      <div class="spacer spacer-xs"></div>
    </div>
  </div>
  <div class="search-body">
    <p class="m-0">{{ body_search|default('Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.') }}</p>
  </div>
</a>
