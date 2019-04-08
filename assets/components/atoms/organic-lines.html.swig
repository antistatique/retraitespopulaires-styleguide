---
title: Organic Lines
name: organic-lines
collection: atoms
variants:
  default: Moving Lines
  fixed-lines: Fixed Lines
notes: |
  This component requires <code>MorphSVGPlugin</code> library (shipped in /build directory) to work properly (animation).

  You only need to insert the following div in your HTML, the rest is injected with Javascript:

  <pre>
  &lt;div class="organic-lines lines-cip"&gt;&lt;/div&gt;
  </pre>

  Or if you want the lines to be fixed:

    <pre>&lt;div class="organic-lines lines-cip fixed-lines"&gt;&lt;/div&gt;</pre>

  Can be wrapped in `.theme-[theme]` to change look.
  Wrap in a `.organic-wrapper` class to position the lines behind the content.
---
<div class="organic-lines {{ variant|default('') }}"></div>
