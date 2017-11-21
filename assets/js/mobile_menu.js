import $ from 'jquery';

export function mobile_menu () {

  const $body    = $('body'),
        $wrapper = $('#collapser-menu-toggler'),
        $header  = $('header'),
        $navbar  = $('#mobile-menu');

  $wrapper.on('click', function() {
    if (!$wrapper.hasClass('active')) {
      $navbar.css({'display': 'block'});
    }

    $body.toggleClass('no-scroll');
    $header.toggleClass('active');
    $wrapper.toggleClass('active');
    $navbar.toggleClass('active');
  });
}
