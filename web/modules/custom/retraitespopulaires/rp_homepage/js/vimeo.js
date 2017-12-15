/**
 * @file vimeo.js
 */
(function ($, Drupal, Vimeo) {

  "use strict";

  Drupal.behaviors.VimeoPlayer = {
    attach: function (context) {
      let vimeoPlayer = null;
      let $video = null;
      const ratio = $('#vimeo-player').data('ratio');

      let options = {
        width: $('.vimeo-player').width(),
        byline: false,
        title: false,
        autoplay: true,
        color: "008e4f",
      };

      const initPlayer = function() {
        vimeoPlayer = new Vimeo.Player('vimeo-player', options);

        vimeoPlayer.on('play', function() {
          $('.vimeo-player-play').remove();
          $('.vimeo-player').css({
            backgroundImage: '',
          });
        });

        vimeoPlayer.on('loaded', function() {
          $video = $(vimeoPlayer.element);
          console.log(ratio);
        });
      };

      $('.vimeo-player-play a').on('click', function(e) {
        e.preventDefault();

        // Update the options, the window size may have changed.
        options.width = $('.vimeo-player').width();

        initPlayer();
      });

      // Make the iframe responsive on resize

      $(window).on('resize', function(e) {
        if ($video) {
          const newWidth = $('.vimeo-player').width();

          $video
            .width(newWidth)
            .height(newWidth * ratio);
        }
      });
    },
  };
}(jQuery, Drupal, Vimeo));
