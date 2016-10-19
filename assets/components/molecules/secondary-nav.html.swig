---
title: secondary-nav
name: secondary-nav
collection: molecules
notes: |
  ##### Usage : `secondary-nav`
  ##### Options :
  - **theme** - String
  - **json** - String
---
<div class="secondary-nav secondary-nav-{{ theme }}">
  <div class="back">
    <a href="#" class="retraitespopulaires-icon retraitespopulaires-icon-2x retraitespopulaires-icon-arrow-left"></a>
  </div>
  <div class="secondary-nav-content">

    {% set nav = null %}
    {% if json == 'particuliers'  %}
      {% set nav = data.nav.particuliers %}
    {% elseif json == 'assurance-vie'  %}
      {% set nav = data.nav.assurancevie %}
    {% else  %}
      {% set nav = data.nav.lorem %}
    {% endif %}

    <div class="title h5 text-cocon">{{ nav.title }}</div>
    <ul class="links list-no-style list-no-padding">
      {% for link in nav.links %}

        {% set classes = '' %}
        {% if link.active  %}
          {% set classes = 'active text-bold' %}
        {% endif %}

        <li class="{{ classes }}">
          {% if link.active  %}
            {{ link.label }}
          {% else %}
            <a class="pretty-link" href="{{ link.url }}">{{ link.label }}</a>
          {% endif %}
        </li>

        {% if link.children  %}
          <li class="">
            <ul class="list-no-style list-no-padding">
              {% for child in link.children %}
                {% set classes = '' %}
                {% if child.active  %}
                  {% set classes = 'active text-bold' %}
                {% endif %}
                <li class="{{ classes }}">
                  <a class="pretty-link" href="{{ child.url }}">{{ child.label }}</a>
                </li>
              {% endfor %}
            </ul>
          </li>
        {% endif %}
      {% endfor %}
    </ul>
  </div>
</div>
