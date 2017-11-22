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

  const setCookieHidden = () => {
    // Expiration date is in 14 days
    const expiration = new Date(new Date().getTime() + 1209600000);
    document.cookie = `rp_popin=hidden; expires=${expiration};`;
  };

  const showPopin = () => {
    $('.popin').fadeIn(400);
  };

  $(document).on('close.bs.alert', function(e) {
    if ($(e.target).hasClass('popin')) {
      setCookieHidden();
    }
  });

  // on domReady
  $(function () {
    const $popinForm = $('#rp-popin-form');

    // Form not found, skip everything
    if (!$popinForm.size()) {
      return;
    }

    // Show the popin after 6 seconds on the page.
    const popin = setTimeout(function() {
      if (readCookie('rp_popin') !== 'hidden') {
        showPopin();
      }
    }, 6000);

    // TODO Add Javascript Session Cookie after form submit ajax.

  });

  /**
   * You can toggle the collapse and change the title and body of the popin.
   *
   * @param data
   *  - data.title: changes the title
   *  - data.title_closed: title when closed, removes the link to toggle the collapse
   *  - data.body: changes the body
   *  - data.toggle: boolean, should the collapse be toggled or not
   */
  $.fn.contactPopin = function(data) {
    const $popin = $(this);

    if (data.toggle) {
      // Toggle the popin collapse
      $popin.find('.collapse').collapse('toggle');
    }

    // Switch the title when closing if we have a new title
    if (data.title_closed) {
      $popin.find('.popin-title-closed').html(data.title_closed).toggleClass('hidden');
      $popin.find('.popin-title-container').toggleClass('hidden');
    }

    // Change the body with a new one
    if (data.title) {
      $popin.find('.popin-title').html(data.title);
    }

    // Change the body with a new one
    if (data.body) {
      $popin.find('.popin-body').html(data.body);
    }

    console.log('Contact Popin function called!');
  };

})(jQuery);
