<!-- fabricator menu -->
<div class="styleguide-menu">

  {% include 'controls.html.swig' %}

  <ul>

    <li>
      <a href="/retraitespopulaires-styleguide/index.html" class="styleguide-menu-heading">Styleguide</a>
    </li>

    <li>
      <span class="styleguide-menu-heading">Documentation</span>
      <ul>
        {% for doc in collections.docs %}
          <li>
            <a href="/retraitespopulaires-styleguide/{{doc.title}}">{{doc.title}}</a>
          </li>
        {% endfor %}
      </ul>
    </li>

    <li>
      <a href="/retraitespopulaires-styleguide/atoms/" class="styleguide-menu-heading">Atoms</a>
      <ul>
        {% for atom in collections.atoms %}
          <li>
            <a href="/retraitespopulaires-styleguide/atoms/#atom{{loop.index}}">{{atom.title}}</a>
          </li>
        {% endfor %}
      </ul>
    </li>

    <li>
      <a href="/retraitespopulaires-styleguide/molecules/" class="styleguide-menu-heading">Molecules</a>
      <ul>
        {% for molecule in collections.molecules %}
          <li>
            <a href="/retraitespopulaires-styleguide/molecules/#molecule{{loop.index}}">{{molecule.title}}</a>
          </li>
        {% endfor %}
      </ul>
    </li>

    <li>
      <a href="/retraitespopulaires-styleguide/organisms/" class="styleguide-menu-heading">Organisms</a>
      <ul>
        {% for organism in collections.organisms %}
          <li>
            <a href="/retraitespopulaires-styleguide/organisms/#organism{{loop.index}}">{{organism.title}}</a>
          </li>
        {% endfor %}
      </ul>
    </li>

    <li>
      <span class="styleguide-menu-heading">Pages</span>
      <ul>
        {% for page in collections.pages %}
          <li>
            <a href="/retraitespopulaires-styleguide/{{page.title}}">{{page.title}}</a>
          </li>
        {% endfor %}
      </ul>
    </li>

  </ul>


</div>
<!-- /fabricator menu -->
