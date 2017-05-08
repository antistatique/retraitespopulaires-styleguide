{% macro default(type, content) %}

{% import 'item-macros.html.swig' as item %}
{% set path = '../../components/' + type + 's/' + content.name + '.html.swig' %}

<div class="styleguide-description clearfix" data-styleguide-toggle="notes">
  {% if content.bootstrap %}
    <a class="btn btn-secondary btn-sm float-xs-right ml-1" href="{{ content.bootstrap }}"><span class="fa fa-book" aria-hidden="true"></span> Bootstrap doc</a>
  {% endif %}

  {% if content.notes or content.changes %}
    <div class="styleguide-item-notes">
    {% if content.changes %}
      <div class="alert alert-warning">
        <ul>
          {% for key, change in content.changes %}
            <li><strong>{{ key }}</strong> {{ change|markdown|raw }}</li>
          {% endfor %}
        </ul>
      </div>
    {% endif %}
    {{content.notes|markdown|raw}}
    </div>
  {% endif %}

</div>

{% if content.variants %}
  {% if Object.keys(content.variants)|first == 'default' %}
    {% set name = content.variants|first %}
  {% else %}
    {% set name = 'Default' %}
  {% endif %}

  <ul class="styleguide-tabs nav nav-tabs" role="tablist">
    <li class="active">
      <a data-toggle="tab" href="#{{content.name}}-default" role="tab">{{ name }}</a>
    </li>
  {% for slug, variant in content.variants %}
    {% if slug != 'default' %}
      <li>
        <a data-toggle="tab" href="#{{slug}}" role="tab">{{variant}}</a>
      </li>
    {% endif %}
  {% endfor %}
  </ul>
{% endif %}

{% if content.variants %}
  <div class="tab-content styleguide-tab-content">
    <div class="styleguide-tab-pane tab-pane active" id="{{content.name}}-default">
      {{ item.preview(content, path) }}
      {{ item.code(path) }}
    </div>
    {% for slug, variant in content.variants %}
      {% if slug != 'default' %}
        <div class="styleguide-tab-pane tab-pane" id="{{slug}}">
          {{ item.preview(content, path, slug) }}
          {{ item.code(path, slug) }}
        </div>
      {% endif %}
    {% endfor %}
  </div>
{% else %}
  {{ item.preview(content, path) }}
  {{ item.code(path) }}
{% endif %}


{% endmacro %}
