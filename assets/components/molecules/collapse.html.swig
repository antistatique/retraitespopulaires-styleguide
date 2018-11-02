---
title: Collapse
name: collapse
collection: molecules
notes: |
  Can be wrapped in `.theme-[theme]` to change look.

variants:
  default: Default
  bubble: Bubble
---
<div class="collapse-wrapper">
  {%  if variant|default('default') == 'default' %}
    <div class="collapse-title">
      <h5 class="inline-block">
        <a class="text-primary" href="#">Assurance vie</a>
      </h5>
      <a class="inline-block pull-right collapse-button" role="button" data-toggle="collapse" href="#assurance-vie-default" aria-expanded="true" aria-controls="assurance-vie" aria-label="Cliquez pour dérouler le contenu de la section assurance-vie.">
        <i class="retraitespopulaires-icon retraitespopulaires-icon-angle"></i>
      </a>
      <div class="clearfix"></div>
    </div>
  {% elseif variant == 'bubble' %}
    <div class="collapse-title" role="button" data-toggle="collapse" href="#assurance-vie-bubble" aria-expanded="true" aria-controls="assurance-vie" aria-label="Cliquez pour dérouler le contenu de la section assurance-vie.">
      <div class="button-bubble inline-block">
        <div class="bubble-icon">
          <i class="retraitespopulaires-icon retraitespopulaires-icon-arrow-right"></i>
        </div>
      </div>
      <h5 class="inline-block">Assurance vie</h5>
    </div>
  {% endif %}
  <div id="assurance-vie-{{ variant|default('default') }}" class="collapse-body collapse in">
    <ul class="unordered-list">
      <li>Ut efficitur mattis</li>
      <li>Ut efficitur mattis</li>
      <li>Ut efficitur mattis</li>
      <li>Ut efficitur mattis</li>
      <li>Ut efficitur mattis</li>
      <li>Ut efficitur mattis</li>
      <li>Ut efficitur mattis</li>
      <li>Ut efficitur mattis</li>
      <li>Ut efficitur mattis</li>
    </ul>
  </div>
  </div>
  <div class="ckeditor-accordion-container"><dl class="styled"><dt class="active"><span class="ckeditor-accordion-toggle active"></span><a class="ckeditor-accordion-toggler" href="#" tabindex="-1">Accordion title 1</a></dt>
  	<dd class="active" style="display: block;">
  	<p>Accordion content 1.</p>
  	</dd>
  	<dt><span class="ckeditor-accordion-toggle"></span><a class="ckeditor-accordion-toggler" href="#" tabindex="-1">Accordion title 2</a></dt>
  	<dd>
  	<p>Accordion content 2.</p>
  	</dd>
  </dl>
  </div>
