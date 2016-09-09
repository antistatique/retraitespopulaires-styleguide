import $ from 'jquery';

export function big_menu () {

  const $body    = $('body'),
        $wrapper = $('.hamburger-wrapper'),
        $navbar  = $('.big-menu'),
        $search  = $('.global-search');

  $wrapper.on('click', function() {
    if ($wrapper.hasClass('active')) {
      $body.toggleClass('no-scroll');
      $wrapper.toggleClass('active');
      $navbar.toggleClass('active');
      $search.toggleClass('active');
    }else{
      $body.toggleClass('no-scroll');
      $navbar.css({'display': 'block'});
      $wrapper.toggleClass('active');
      $navbar.toggleClass('active');
      $search.toggleClass('active');
    }
  });

  /** SWIPER **/

  const $swiper = $('.swiper-menu');

  // This is under 992px
  if (!window.matchMedia('(min-width: 992px)').matches) {
    console.log('fixheight');
    let height = $swiper.find('.swiper-column-1').height();
    $swiper.find('.swiper-column-2, .swiper-column-3').css({'height': height});
  }

  /**
   * Open the correct pan and close the old one
   * @type {[type]}
   */
  $swiper.find('.swiper-list .arrow-next').on('click', function(event){
    event.preventDefault();

    // Remove the empty-state
    $swiper.find('.swiper-empty-state').not('inactive').addClass('inactive').on( 'webkitAnimationEnd mozAnimationEnd oAnimationEnd oanimationend animationend', function() {
      $(this).remove();
    });

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
  });

  /**
   * Open the correct pan and close the old one
   * @type {[type]}
   */
  $swiper.find('.swiper-list .arrow-back').on('click', function(event){
    event.preventDefault();

    const $current_pane = $(this).parents('.swiper-list');
    const $current_wrapper = $(this).parents('.swiper-column-wrapper');

    // Close current pane
    $current_pane.removeClass('active');
    $current_wrapper.removeClass('active');
  });
}
