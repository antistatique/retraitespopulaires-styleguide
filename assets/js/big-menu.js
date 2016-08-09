'use strict';

(function($){
  $(document).ready(function() {
    const $body      = $('body'),
          $wrapper   = $('.hamburger-wrapper'),
          $button    = $('.hamburger-button'),
          $navbar    = $('.big-menu'),
          $container = $('.big-menu-container');

    $wrapper.on('click', function() {
      if ($wrapper.hasClass('active')) {
        $body.toggleClass('no-scroll');
        $wrapper.toggleClass('active');
        $navbar.toggleClass('active');
      }else{
        $body.toggleClass('no-scroll');
        $navbar.css({'display': 'block'});
        $wrapper.toggleClass('active');
        $navbar.toggleClass('active');
      }
    });
  });
}(jQuery));
