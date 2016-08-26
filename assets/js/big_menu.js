import $ from 'jquery';

export function big_menu () {

  const $body    = $('body'),
        $wrapper = $('.hamburger-wrapper'),
        $navbar  = $('.big-menu');

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

}
