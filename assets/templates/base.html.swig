<!DOCTYPE html>
<!--[if lt IE 7]>      <html class="no-js lt-ie10 lt-ie9 lt-ie8 lt-ie7"> <![endif]-->
<!--[if IE 7]>         <html class="no-js lt-ie10 lt-ie9 lt-ie8"> <![endif]-->
<!--[if IE 8]>         <html class="no-js lt-ie10 lt-ie9"> <![endif]-->
<!--[if IE 9]>         <html class="no-js lt-ie10"> <![endif]-->
<!--[if gt IE 9]><!--> <html class="no-js"> <!--<![endif]-->
  <head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
    <title></title>
    <meta name="description" content="">
    <meta name="keywords" content="HTML,CSS,XML,JavaScript">
    <meta name="viewport" content="width=device-width">

    {% if styleguide %}
      <link rel="stylesheet" href="/retraitespopulaires-styleguide/build/css/styleguide.css">
    {% endif %}

    <link rel="stylesheet" href="/retraitespopulaires-styleguide/build/css/vendors.min.css">
    <link rel="stylesheet" href="/retraitespopulaires-styleguide/build/css/main.css">

    <!-- Favicons -->
    <link rel="apple-touch-icon" sizes="57x57" href="/retraitespopulaires-styleguide/build/favicons/apple-icon-57x57.png">
    <link rel="apple-touch-icon" sizes="60x60" href="/retraitespopulaires-styleguide/build/favicons/apple-icon-60x60.png">
    <link rel="apple-touch-icon" sizes="72x72" href="/retraitespopulaires-styleguide/build/favicons/apple-icon-72x72.png">
    <link rel="apple-touch-icon" sizes="76x76" href="/retraitespopulaires-styleguide/build/favicons/apple-icon-76x76.png">
    <link rel="apple-touch-icon" sizes="114x114" href="/retraitespopulaires-styleguide/build/favicons/apple-icon-114x114.png">
    <link rel="apple-touch-icon" sizes="120x120" href="/retraitespopulaires-styleguide/build/favicons/apple-icon-120x120.png">
    <link rel="apple-touch-icon" sizes="144x144" href="/retraitespopulaires-styleguide/build/favicons/apple-icon-144x144.png">
    <link rel="apple-touch-icon" sizes="152x152" href="/retraitespopulaires-styleguide/build/favicons/apple-icon-152x152.png">
    <link rel="apple-touch-icon" sizes="180x180" href="/retraitespopulaires-styleguide/build/favicons/apple-icon-180x180.png">
    <link rel="icon" type="image/png" sizes="192x192"  href="/retraitespopulaires-styleguide/build/favicons/android-icon-192x192.png">
    <link rel="icon" type="image/png" sizes="32x32" href="/retraitespopulaires-styleguide/build/favicons/favicon-32x32.png">
    <link rel="icon" type="image/png" sizes="96x96" href="/retraitespopulaires-styleguide/build/favicons/favicon-96x96.png">
    <link rel="icon" type="image/png" sizes="16x16" href="/retraitespopulaires-styleguide/build/favicons/favicon-16x16.png">
    <link rel="manifest" href="/retraitespopulaires-styleguide/build/favicons/manifest.json">
    <meta name="msapplication-TileColor" content="#ffffff">
    <meta name="msapplication-TileImage" content="/retraitespopulaires-styleguide/build/favicons/ms-icon-144x144.png">
    <meta name="theme-color" content="#ffffff">

    <!--[if lt IE 9]>
      <script src="/build/js/polyfills.min.js"></script>
    <![endif]-->
  </head>
  <body>
    {% if styleguide %}
      {% include 'styleguide/icons.html.swig' %}
      {% include 'styleguide/menu.html.swig' %}
      <div class="styleguide-container">
        <div class="styleguide-header-container"{% if heading_color %} style="background: {{heading_color}};"{% endif %}>
          {% include 'styleguide/control.bar.html.swig' %}
          <h1>{{title}}</h1>
        </div>
    {% endif %}

    {% block content %}{% endblock %}

    {% if styleguide %}
      </div>
    {% endif %}

    <script src="//code.jquery.com/jquery-2.2.4.min.js" crossorigin="anonymous"></script>
    <script src="/retraitespopulaires-styleguide/build/js/vendors.min.js"></script>
    <script src="/retraitespopulaires-styleguide/build/js/bundle.js"></script>

    {% if styleguide %}
      <script>
        (function($){
          $(document).ready(function(){
            $('.styleguide-item-code code').each(function(){
              $(this).html($(this).html().replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;'));
            });
          });
        }(jQuery));
      </script>
      <script src="/retraitespopulaires-styleguide/build/js/styleguide.min.js"></script>
    {% endif %}

    {% block javascripts %}{% endblock %}
  </body>
</html>
