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
      <link rel="stylesheet" href="{{data.path}}build/css/styleguide.css">
    {% endif %}

    <link rel="stylesheet" href="{{data.path}}build/css/vendors.min.css">
    <link rel="stylesheet" href="{{data.path}}build/css/main.css">

    <!-- Favicons -->
    <link rel="apple-touch-icon" sizes="180x180" href="{{data.path}}build/favicons/apple-touch-icon.png">
    <link rel="icon" type="image/png" sizes="32x32" href="{{data.path}}build/favicons/favicon-32x32.png">
    <link rel="icon" type="image/png" sizes="16x16" href="{{data.path}}build/favicons/favicon-16x16.png">
    <link rel="manifest" href="{{data.path}}build/favicons/manifest.json">
    <link rel="mask-icon" href="{{data.path}}build/favicons/safari-pinned-tab.svg" color="#008e4f">
    <meta name="theme-color" content="#008e4f">

    <!--[if lt IE 9]>
      <script src="{{data.path}}build/js/polyfills.min.js"></script>
    <![endif]-->
  </head>
  <body>
    {% if styleguide %}
      <div class="styleguide-toggle-container">
        <div class="styleguide-toggle-theme-hide">
          <button class="styleguide-toggle-theme btn btn-primary btn-sm" title="Toggle theme"><span class="fa fa-paint-brush"></span></button>
        </div>
      </div>

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
    <script src="//code.jquery.com/ui/1.12.0/jquery-ui.min.js" crossorigin="anonymous"></script>
    <script src="{{data.path}}build/js/selectize.min.js"></script>
    <script src="{{data.path}}build/js/vendors.min.js"></script>
    <script src="{{data.path}}build/js/bundle.js"></script>

    {% if styleguide %}
      <script>
        (function($){
          $(document).ready(function(){
            $('.styleguide-item-code code').each(function(){
              $(this).html($(this).html().replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;'));
            });

            // Toggle theme
            $('.styleguide-toggle-theme').on('click', function() {
              $('.styleguide-item-preview, .styleguide-toggle-container').toggleClass('theme-cip');
            });
          });
        }(jQuery));
      </script>
      <script src="{{data.path}}build/js/styleguide.min.js"></script>
    {% endif %}

    {% block javascripts %}{% endblock %}
  </body>
</html>
