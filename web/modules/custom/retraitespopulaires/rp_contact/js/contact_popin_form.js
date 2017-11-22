(function ($) {
  'use strict';

  // https://www.sitepoint.com/how-to-deal-with-cookies-in-javascript/
  function readCookie(name) {
    const nameEQ = `${name}=`;
    const ca = document.cookie.split(';');
    for (let i = 0; i < ca.length; i++) {
      let c = ca[i];
      while (c.charAt(0) == ' ') c = c.substring(1, c.length);
      if (c.indexOf(nameEQ) == 0) {
        return c.substring(nameEQ.length, c.length);
      }
    }
    return null;
  }

  // on domReady
  $(function () {
    const $popinForm = $('#rp-popin-form');

    // Form not found, skip everything
    if (!$popinForm.size()) {
      return;
    }

    const showPopin = () => {
      $('.popin').fadeIn(400);
    }

    const setCookie = () => {
      // Expiration date is in 14 days
      const expiration = new Date(new Date().getTime() + 1209600000);
      document.cookie = `rp_popin=hidden; expires=${expiration};`;
    }

    $(document).on('close.bs.alert', function(e) {
      if ($(e.target).hasClass('popin')) {
        setCookie();
      }
    });

    // Show the popin after 6 seconds on the page.
    const popin = setTimeout(function() {
      if (readCookie('rp_popin') !== 'hidden') {
        showPopin();
      }
    }, 6000);

    // TODO Add Javascript Session Cookie after form submit ajax.

  });
})(jQuery);
