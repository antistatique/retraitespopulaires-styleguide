---
title: Secondary Nav
name: secondary-nav
collection: molecules
notes: |
  Can be wrapped in `.theme-[theme]` to change look

  ##### Options :
  - **secondary_nav_json** - <i>String</i>
---
<div class="theme-{{ secondary_nav_json }}">
  <div class="secondary-nav">
    <h2 class="sr-only">Navigation secondaire</h2>
    <div class="secondary-nav-content" >
      {% set nav = null %}
      {% if secondary_nav_json == 'particuliers'  %}
        {% set nav = data.nav.particuliers %}
      {% elseif secondary_nav_json == 'assurance-vie'  %}
        {% set nav = data.nav.assurancevie %}
      {% elseif secondary_nav_json == 'emploi'  %}
        {% set nav = data.nav.emploi %}
      {% elseif secondary_nav_json == 'cip'  %}
        {% set nav = data.nav.cip %}
      {% elseif secondary_nav_json == 'portailca'  %}
        {% set nav = data.nav.portailca %}
      {% else  %}
        {% set nav = data.nav.lorem %}
      {% endif %}

      <div class="title h5 text-secondary"><a href="#">{{ nav.title }}</a></div>
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
        {% if link.children.length %}
            <li class="children">
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
</div>
