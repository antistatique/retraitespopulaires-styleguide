'use strict';

(function($){
  $(document).ready(function() {
    const $body = $('body'),
          $button = $('.hamburger-button'),
          $navbar = $('.big-menu'),
          $container = $('.big-menu-container');

    $button.on('click', function() {
      if ($button.hasClass('active')) {
        $body.toggleClass('no-scroll');
        $button.toggleClass('active');
        $navbar.toggleClass('active');
      }else{
        $body.toggleClass('no-scroll');
        $navbar.css({'display': 'block'});
        $button.toggleClass('active');
        $navbar.toggleClass('active');
      }
    });
  });
}(jQuery));
