import $ from 'jquery';

export function big_menu () {

  const $body    = $('body'),
        $wrapper = $('.hamburger-wrapper'),
        $header  = $('header'),
        $navbar  = $('.big-menu');

  $wrapper.on('click', function() {
    if ($wrapper.hasClass('active')) {
      $body.toggleClass('no-scroll');
      $header.toggleClass('active');
      $wrapper.toggleClass('active');
      $navbar.toggleClass('active');
    }else{
      $body.toggleClass('no-scroll');
      $header.toggleClass('active');
      $navbar.css({'display': 'block'});
      $wrapper.toggleClass('active');
      $navbar.toggleClass('active');
    }
  });

  /** SWIPER **/

  const $swiper = $('.swiper-menu');

  /**
   * Open the correct pan and close the old one
   * @type {[type]}
   */
  $swiper.find('.swiper-list .arrow-next').on('click', function(event){
    event.preventDefault ? event.preventDefault() : (event.returnValue = false);

    // This is under 992px, we lock body when opening children pan
    if (!window.matchMedia('(min-width: 992px)').matches) {
      $navbar.animate({
        scrollTop: 0
      }, 500, function(){
        $navbar.addClass('no-scroll');

        // Fix the height for scrolling
        let height = $(window).height() - $('.swiper-column-wrapper.active').offset().top;
        $swiper.find('.swiper-column-wrapper-2, .swiper-column-wrapper-3').css({'height': height});
      });
    }

    // Remove the empty-state
    $swiper.find('.swiper-empty-state').not('inactive').addClass('inactive');
    setTimeout(() => {
      $swiper.find('.swiper-empty-state').remove();
    }, 250);

    // Unactive all other siblings li in the column
    $(this).parents('.swiper-column').find('li.active').toggleClass('active');
    // Active the clicked one
    $(this).parents('li').toggleClass('active');

    const $next_pane = $swiper.find('[data-list="'+$(this).attr('href')+'"]');
    const $next_pane_parent = $next_pane.parents('.swiper-column');
    const $next_wrapper = $next_pane_parent.parents('.swiper-column-wrapper');
    const $current_pane = $(this).parents('.swiper-list');

    if ($next_pane_parent.hasClass('swiper-column-3') && $next_pane_parent.hasClass('swiper-column-waiting')) {
      $next_pane_parent.removeClass('swiper-column-waiting');
    }

    // Unactive current opened pan
    $swiper.find('.swiper-list-alternative.active').not($current_pane).each(function(index, elem) {
      $(elem).removeClass('active');

      let $wrapper = $(elem).parents('.swiper-column-wrapper');
      $wrapper.removeClass('active');
    });
    // Open desired pan
    $next_wrapper.addClass('active');
    $next_pane.toggleClass('active');
    $next_wrapper.animate({
      scrollTop: 0
    }, 500);
  });

  /**
   * Open the correct pan and close the old one
   * @type {[type]}
   */
  $swiper.find('.swiper-list .arrow-back').on('click', function(event){
    event.preventDefault ? event.preventDefault() : (event.returnValue = false);

    const $current_pane = $(this).parents('.swiper-list');
    const $current_wrapper = $(this).parents('.swiper-column-wrapper');

    // This is under 992px, we lock body when opening children pan
    if ($current_wrapper.hasClass('swiper-column-wrapper-2') && !window.matchMedia('(min-width: 992px)').matches) {
      $navbar.removeClass('no-scroll');
    }

    // Close current pane
    $current_pane.removeClass('active');
    setTimeout(() => {
      $current_wrapper.removeClass('active');
    }, 250);

  });
}
