---
title: Light Page
name: light-page
collection: pages
styleguide: false
layout: page.html.swig
---
{% include '../organisms/header.html.swig' with {'light': true} %}
<div class="spacer spacer-xl"></div>
<div class="spacer spacer-xl hidden-md hidden-lg"></div>

<div class="container" style="height: 250px"></div>

<div class="spacer"></div>
{% include '../organisms/footer.html.swig' with {'footer_light': true} %}
