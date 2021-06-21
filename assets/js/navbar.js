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

  window.addEventListener("scroll", function()
  {
    let stickyLogo = $('[class^="img-sticky"]')[0];
    let headerContainer = $(".header-container")[0];
    let imgHeader = $(".logo-retraitespopulaires")[0];
    let listHeader = $(".wrapper-navs")[0];
    let containerMandant = $('[id$="-layoutheaderblock"]')[0];

    if(typeof stickyLogo == "undefined"){
      return null;
    }

    if(window.scrollY > headerContainer.clientHeight && typeof listHeader == "undefined" || MandantHeaderChecker(window.scrollY,containerMandant, headerContainer)) {
        if(screen.width > 992 ) {
          if(typeof listHeader !== "undefined"){
            listHeader.style.flex = "0 1 100%";
          }
          imgHeader.style.display = "none";
          stickyLogo.style.display = "initial";
        }else{
          imgHeader.style.display = "initial";
          stickyLogo.style.display = "none";
        }
    }else
    {
      stickyLogo.style.display = "none";
      imgHeader.style.display = "initial";
      if(typeof listHeader !== "undefined"){
        listHeader.style.flex = "0 1 800px";
      }
    }


  });

  function MandantHeaderChecker(scroll,containerMandant,headerContainer){

    if(typeof containerMandant !== "undefined") {
      return scroll > (headerContainer.clientHeight + parseInt(getComputedStyle(containerMandant).top));
    }
    return false;
  }

}
