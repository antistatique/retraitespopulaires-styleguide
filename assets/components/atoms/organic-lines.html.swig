---
title: organic-lines
name: organic-lines
collection: atoms
notes: |
  ##### Usage : `organic-lines`
  ##### Note :
  This component require <code>MorphSVGPlugin</code> library (shipped in /build directory) to work properly (animation).

  You only need to insert the following div in your HTML, the rest is injected with Javascript:
  <pre>
    &lt;div class="organic-lines lines-assurance"&gt;&lt;/div&lt;
  </pre>

  ##### Options :
  - **organic_lines_theme** - <i>String</i> - <b>lines-['assurance'|'prevoyance'|'immobilier'|'hypotheque'|'institutionnel'|'profelia'|'cpev'|'cip']</b>

---
<div class="organic-lines lines-{{ organic_lines_theme|default('primary') }}"></div>
