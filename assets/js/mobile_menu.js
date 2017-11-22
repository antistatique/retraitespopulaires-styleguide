import $ from 'jquery';

export function mobile_menu () {

  const $body    = $('body'),
        $wrapper = $('#collapser-menu-toggler'),
        $header  = $('header'),
        $navbar  = $('#mobile-menu');

  function toggleMenu() {
    if (!$wrapper.hasClass('active')) {
      $navbar.css({'display': 'block'});
    }

    $body.toggleClass('no-scroll');
    $header.toggleClass('active');
    $wrapper.toggleClass('active');
    $navbar.toggleClass('active');
  }

  $wrapper.on('click', function() {
    toggleMenu();
  });

  // Close the menu when ESC is pressed
  $(document).keyup(function(e) {
    if (e.keyCode == 27) {
      if ($navbar.hasClass('active')) {
        toggleMenu();
      }
    }
  });

  // Animate header-container to white background on scroll to avoid reading
  // issues. Keep it transparent at first, because of the funky waves
  const $headerContainer = $('.header-container');
  function animateHeaderBackground(posY) {
    if (
        (posY > 50 && !$headerContainer.hasClass('bg-white')) ||
        (posY <= 50 && $headerContainer.hasClass('bg-white'))
      ) {
      $headerContainer.toggleClass('bg-white');
    }
  }

  $navbar.on('scroll', function() {
    const posY = $(this).scrollTop();
    animateHeaderBackground(posY);
  });
}
