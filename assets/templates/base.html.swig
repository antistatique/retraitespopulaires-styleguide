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

    {# Photoswipe Wrapper #}
    <div class="pswp" tabindex="-1" role="dialog" aria-hidden="true">
      <div class="pswp__bg"></div>
      <div class="pswp__scroll-wrap">

        <div class="pswp__container">
          <div class="pswp__item"></div>
          <div class="pswp__item"></div>
          <div class="pswp__item"></div>
        </div>

        <div class="pswp__ui pswp__ui--hidden">
          <div class="pswp__top-bar">
            <div class="pswp__counter"></div>
            <button class="pswp__button pswp__button--close" title="Close (Esc)"></button>
            <button class="pswp__button pswp__button--share" title="Share"></button>
            <button class="pswp__button pswp__button--fs" title="Toggle fullscreen"></button>
            <button class="pswp__button pswp__button--zoom" title="Zoom in/out"></button>
            <div class="pswp__preloader">
              <div class="pswp__preloader__icn">
                <div class="pswp__preloader__cut">
                  <div class="pswp__preloader__donut"></div>
                </div>
              </div>
            </div>
          </div>
          <div class="pswp__share-modal pswp__share-modal--hidden pswp__single-tap">
            <div class="pswp__share-tooltip"></div>
          </div>
          <button class="pswp__button pswp__button--arrow--left" title="Previous (arrow left)">
          </button>
          <button class="pswp__button pswp__button--arrow--right" title="Next (arrow right)">
          </button>
          <div class="pswp__caption">
            <div class="pswp__caption__center"></div>
          </div>
        </div>
      </div>
    </div>

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
