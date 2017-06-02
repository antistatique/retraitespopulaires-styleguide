import $ from 'jquery';

export function navbar () {
  $(document).on('click', '.js-header-push .hamburger-wrapper, .menu-access .menu', function(e){
    const $this = $(this);

    navbar_toggle();

    // Open the menu when using skip-link
    if ($this.attr('href') != '#main-navigation') {
      e.preventDefault();
    }
  });

  // Close the menu when ESC is pressed
  $(document).keyup(function(e) {
    if (e.keyCode == 27) {
      const $body = $(document.body);
      if ($body.hasClass('menu-push-toright')) {
        navbar_toggle();
      }
    }
  });

  function navbar_toggle() {
    const $body      = $(document.body);
    const $menu      = $('.menu-push');
    const $overlay   = $('.body-overlay');

    $body.toggleClass('menu-push-toright');
    $menu.toggleClass('menu-open');
    $overlay.toggleClass('visible');
  }
}
