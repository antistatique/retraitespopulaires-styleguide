import $ from 'jquery';

export function accessibility () {

  let $navMobile = $('.secondary-nav-mobile');
  let $navDesktop = $('.secondary-nav-desktop');

  function handleSecondaryNavHidden () {
    if (window.matchMedia('(min-width: 992px)').matches) {
      $navMobile.each(function () {
        $(this).attr('aria-hidden', true);
      });
      $navDesktop.each(function () {
        $(this).attr('aria-hidden', false);
      });
    } else {
      $navMobile.each(function () {
        $(this).attr('aria-hidden', false);
      });
      $navDesktop.each(function () {
        $(this).attr('aria-hidden', true);
      });
    }
  }

  $(window).resize(handleSecondaryNavHidden);
  handleSecondaryNavHidden();

}
