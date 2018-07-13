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
        width: parseInt($('.vimeo-player').width(), 10),
        byline: false,
        title: false,
        autoplay: false,
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
        });
      };

      $('.vimeo-player-play a').on('click', function(e) {
        e.preventDefault();

        // Update the options, the window size may have changed.
        options.width = $('.vimeo-player').width();

        if (vimeoPlayer) {
          vimeoPlayer.play();
        }
      });

      if ($('.vimeo-player').length > 0) {
        initPlayer();
      }

      // Make the iframe responsive on resize
      $(window).on('resize', function(e) {
        if ($video) {
          const newWidth = $('.vimeo-player').width();

          $video
            .width(parseInt(newWidth, 10))
            .height(parseInt(newWidth * ratio, 10));
        }
      });
    },
  };
}(jQuery, Drupal, Vimeo));
