---
title: loader
name: loader
collection: atoms
variants:
  default: Loader Snake
  loader-yingyang: Loader YingYang
notes: |
  Can be wrapped in `.theme-[theme]` to change look
---
<div class="loader"><div class="{{ variant|default('loader-snake') }}"></div></div>
