---
title: teaser-search
name: teaser-search
collection: molecules
notes: |
  ##### Usage : `teaser-search`
  ##### Options :
  - **teaser_search_title** - <i>String</i>
  - **teaser_search_type** - <i>String</i>
  - **teaser_search_link** - <i>String</i>
  - **teaser_search_body** - <i>String</i>
---
<a href="{{ teaser_search_link|default('#') }}" class="teaser teaser-{{teaser_search_theme}} teaser-fullclick teaser-search shadow shadow-down">
  <div class="search-heading">
    <div class="text-primary">
      <div class="text-secondary h4 text-{{teaser_search_theme}}">{{ teaser_search_title|default('Lorem Ipsum') }}</div>
      <div class="spacer spacer-xs"></div>
      <div class="text-secondary h6 text-muted">{{ teaser_search_type|default('Dolore')|upper }}</div>
      <div class="spacer spacer-xs"></div>
    </div>
  </div>
  <div class="search-body">
    <p class="m-0">{{ teaser_search_body|default('Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor <mark>incididunt</mark> ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.')|raw }}</p>
  </div>
</a>
