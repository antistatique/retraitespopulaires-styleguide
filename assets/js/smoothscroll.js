import $ from 'jquery';

export function smoothscroll_load () {
  console.log('load');
  setTimeout(function() {
    if (location.hash) {
      /* we need to scroll to the top of the window first, because the browser will always jump to the anchor first before JavaScript is ready, thanks Stack Overflow: http://stackoverflow.com/a/3659116 */
      window.scrollTo(0, 0);
      const hash = location.hash.split('#');
      smoothScrollTo($('#'+hash[1]));
    }
  }, 1);
}

export function smoothscroll_click () {
  $('a[href*=#]:not([href=#])').click(function() {
    if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname) {
      smoothScrollTo($(this.hash));
      return false;
    }
  });
}

const smoothScrollTo = function(dest, offset = 100) {
  const target = dest.length ? dest : $('[name=' + this.hash.slice(1) +']');
  if (target.length) {
    $('html,body').animate({
      scrollTop: target.offset().top - offset
    }, 1000);
  }
};
