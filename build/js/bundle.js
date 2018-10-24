(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
(function (global){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.datepicker = datepicker;

var _jquery = (typeof window !== "undefined" ? window['jQuery'] : typeof global !== "undefined" ? global['jQuery'] : null);

var _jquery2 = _interopRequireDefault(_jquery);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function datepicker() {
  var options = {
    language: 'fr',
    format: 'dd/mm/yyyy',
    showOnFocus: false,
    todayHighlight: true
  };

  (0, _jquery2.default)('.datepicker').datepicker(options);

  (0, _jquery2.default)('.datepicker + .input-group-btn').on('click', 'button', function () {
    (0, _jquery2.default)(this).parents('.form-group').find('.datepicker').datepicker('show');
  });
}

}).call(this,typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{}],2:[function(require,module,exports){
(function (global){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.gallery = gallery;

var _jquery = (typeof window !== "undefined" ? window['jQuery'] : typeof global !== "undefined" ? global['jQuery'] : null);

var _jquery2 = _interopRequireDefault(_jquery);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function gallery() {

  // Define click event on gallery item
  (0, _jquery2.default)('.gallery').on('click', 'a', function (event) {

    // Prevent location change
    event.preventDefault();

    // Generate the tree
    var container = [];
    (0, _jquery2.default)('.gallery [itemprop="associatedMedia"]').each(function () {
      var $this = (0, _jquery2.default)(this);
      container.push({
        src: $this.find('a').attr('href'),
        w: $this.find('a').data('width'),
        h: $this.find('a').data('height')
      });
    });

    // Define object and gallery options
    var $pswp = (0, _jquery2.default)('.pswp')[0],
        options = {
      index: (0, _jquery2.default)(this).data('index'),
      bgOpacity: 0.85,
      showHideOpacity: true,
      shareEl: true,
      shareButtons: [{ id: 'download', label: 'Download', url: '{{raw_image_url}}', download: true }]
    };

    // Initialize PhotoSwipe
    var gallery = new PhotoSwipe($pswp, PhotoSwipeUI_Default, container, options);
    gallery.init();
  });
}

}).call(this,typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{}],3:[function(require,module,exports){
'use strict';

var _mobile_menu = require('./mobile_menu.js');

var _navbar = require('./navbar.js');

var _input_dynamic_label = require('./input_dynamic_label.js');

var _input_files = require('./input_files.js');

var _organicJS = require('./organicJS.js');

var _datepicker = require('./datepicker.js');

var _number_format = require('./number_format.js');

var _smoothscroll = require('./smoothscroll.js');

var _gallery = require('./gallery.js');

var _popover = require('./popover.js');

var _selectize = require('./selectize.js');

var _labels = require('./labels.js');

var _slider = require('./slider.js');

(function () {
  (0, _mobile_menu.mobile_menu)();
  (0, _navbar.navbar)();
  (0, _smoothscroll.smoothscroll_load)();
  (0, _input_dynamic_label.input_dynamic_label)();
  (0, _input_files.input_files)();
  (0, _gallery.gallery)();
  (0, _organicJS.organic_generate)();
  (0, _datepicker.datepicker)();
  (0, _number_format.number_format)();
  (0, _popover.popover)();
  (0, _selectize.selectize)();
  (0, _labels.labels)();
  (0, _slider.slider)();
})();

},{"./datepicker.js":1,"./gallery.js":2,"./input_dynamic_label.js":4,"./input_files.js":5,"./labels.js":6,"./mobile_menu.js":7,"./navbar.js":8,"./number_format.js":9,"./organicJS.js":10,"./popover.js":11,"./selectize.js":12,"./slider.js":13,"./smoothscroll.js":14}],4:[function(require,module,exports){
(function (global){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.input_dynamic_label = input_dynamic_label;

var _jquery = (typeof window !== "undefined" ? window['jQuery'] : typeof global !== "undefined" ? global['jQuery'] : null);

var _jquery2 = _interopRequireDefault(_jquery);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function input_dynamic_label() {

  (0, _jquery2.default)(document).on('keypress', '.form-group input', function () {
    var $this = (0, _jquery2.default)(this),
        $group = $this.parents('.form-group'),
        $label = $group.find('label');

    // Check the label is empty and value isn't
    if ($this.val().length == 0 && $label.html().length == 0) {
      $label.toggleClass('label-hidden');
      $label.html($this.attr('data-title'));
    }
  });
}

}).call(this,typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{}],5:[function(require,module,exports){
(function (global){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.input_files = input_files;

var _jquery = (typeof window !== "undefined" ? window['jQuery'] : typeof global !== "undefined" ? global['jQuery'] : null);

var _jquery2 = _interopRequireDefault(_jquery);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function input_files() {

  (0, _jquery2.default)('.form-file').each(function () {
    var $handler = (0, _jquery2.default)(this).find('.form-file-handler'),
        $this = (0, _jquery2.default)(this),
        $input = (0, _jquery2.default)(this).find('[type="file"]');

    $this.on('change', function () {
      var files = $input[0].files;
      var $files = (0, _jquery2.default)(this).find('.files');
      if ($files.length == 0) {
        (0, _jquery2.default)('<div class="files"></div>').insertAfter($handler);
        $files = (0, _jquery2.default)(this).find('.files');
      } else {
        // Clean the list
        $files.html('');
      }

      if (files.length == 1) {
        $files.html('<small><i class="retraitespopulaires-icon retraitespopulaires-icon-documents-thick" aria-hidden="true"></i> <span>' + files[0].name + '</span></small>');
      } else {
        for (var x = 0; x < files.length; x++) {
          $files.append('<small><i class="retraitespopulaires-icon retraitespopulaires-icon-documents-thick" aria-hidden="true"></i> <span>' + files[x].name + '</span></small>');
        }
      }
    });
  });
}

}).call(this,typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{}],6:[function(require,module,exports){
(function (global){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.labels = labels;

var _jquery = (typeof window !== "undefined" ? window['jQuery'] : typeof global !== "undefined" ? global['jQuery'] : null);

var _jquery2 = _interopRequireDefault(_jquery);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function labels() {
  (0, _jquery2.default)('.list-inline').on('click', '.js-toggle-labels', function () {
    console.log((0, _jquery2.default)(this));
    (0, _jquery2.default)(this).toggleClass('collapsed').parents('.list-inline').find('.hidden').toggleClass('hidden');
  });
}

}).call(this,typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{}],7:[function(require,module,exports){
(function (global){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.mobile_menu = mobile_menu;

var _jquery = (typeof window !== "undefined" ? window['jQuery'] : typeof global !== "undefined" ? global['jQuery'] : null);

var _jquery2 = _interopRequireDefault(_jquery);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function mobile_menu() {

  var $body = (0, _jquery2.default)('body'),
      $wrapper = (0, _jquery2.default)('#collapser-menu-toggler'),
      $header = (0, _jquery2.default)('header'),
      $navbar = (0, _jquery2.default)('#mobile-menu');

  function toggleMenu() {
    if (!$wrapper.hasClass('active')) {
      $navbar.css({ 'display': 'block' });
    }

    $body.toggleClass('no-scroll');
    $header.toggleClass('active');
    $wrapper.toggleClass('active');
    $navbar.toggleClass('active');
  }

  $wrapper.on('click', function () {
    toggleMenu();
  });

  // Close the menu when ESC is pressed
  (0, _jquery2.default)(document).keyup(function (e) {
    if (e.keyCode == 27) {
      if ($navbar.hasClass('active')) {
        toggleMenu();
      }
    }
  });

  (0, _jquery2.default)(document).on('show.bs.collapse hide.bs.collapse', function (e) {
    var $target = (0, _jquery2.default)(e.target);
    if ($target.hasClass('collapser-menu-collapse')) {
      var $parent = $target.closest('li');
      $parent.toggleClass('toggled');
    }
  });

  // Close when resizing the window
  (0, _jquery2.default)(window).on('resize', function () {
    if ($navbar.hasClass('active')) {
      toggleMenu();
    }
  });

  // Animate header-container to white background on scroll to avoid reading
  // issues. Keep it transparent at first, because of the funky waves
  var $headerContainer = (0, _jquery2.default)('.header-container');
  function animateHeaderBackground(posY) {
    if (posY > 50 && !$headerContainer.hasClass('bg-white') || posY <= 50 && $headerContainer.hasClass('bg-white')) {
      $headerContainer.toggleClass('bg-white');
    }
  }

  $navbar.on('scroll', function () {
    var posY = (0, _jquery2.default)(this).scrollTop();
    animateHeaderBackground(posY);
  });
}

}).call(this,typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{}],8:[function(require,module,exports){
(function (global){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.navbar = navbar;

var _jquery = (typeof window !== "undefined" ? window['jQuery'] : typeof global !== "undefined" ? global['jQuery'] : null);

var _jquery2 = _interopRequireDefault(_jquery);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function navbar() {
  (0, _jquery2.default)(document).on('click', '.js-header-push .hamburger-wrapper, .menu-access .menu', function (e) {
    var $this = (0, _jquery2.default)(this);

    navbar_toggle();

    // Open the menu when using skip-link
    if ($this.attr('href') != '#main-navigation') {
      e.preventDefault();
    }
  });

  // Close the menu when ESC is pressed
  (0, _jquery2.default)(document).keyup(function (e) {
    if (e.keyCode == 27) {
      var $body = (0, _jquery2.default)(document.body);
      if ($body.hasClass('menu-push-toright')) {
        navbar_toggle();
      }
    }
  });

  function navbar_toggle() {
    var $body = (0, _jquery2.default)(document.body);
    var $menu = (0, _jquery2.default)('.menu-push');
    var $overlay = (0, _jquery2.default)('.body-overlay');

    $body.toggleClass('menu-push-toright');
    $menu.toggleClass('menu-open');
    $overlay.toggleClass('visible');
  }
}

}).call(this,typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{}],9:[function(require,module,exports){
(function (global){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.number_format = number_format;

var _jquery = (typeof window !== "undefined" ? window['jQuery'] : typeof global !== "undefined" ? global['jQuery'] : null);

var _jquery2 = _interopRequireDefault(_jquery);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function number_format() {
  (0, _jquery2.default)('.form-chf-numeric').autoNumeric('init', {
    aSep: '\'',
    pSign: 's',
    aSign: ' CHF'
  });

  (0, _jquery2.default)('.form-surface-numeric').autoNumeric('init', {
    aSep: '\'',
    mDec: '0',
    pSign: 's',
    aSign: ' m2'
  });

  (0, _jquery2.default)('.form-percent-numeric').autoNumeric('init', {
    aSep: '\'',
    pSign: 's',
    aSign: ' %'
  });

  // To be sure that the format is respected (when back on browser)
  (0, _jquery2.default)('.form-chf-numeric').autoNumeric('update');
  (0, _jquery2.default)('.form-surface-numeric').autoNumeric('update');
  (0, _jquery2.default)('.form-percent-numeric').autoNumeric('update');

  // Replace formatted value to raw one when submitting forms
  (0, _jquery2.default)(document).on('submit', 'form', function () {
    var $this = (0, _jquery2.default)(this);

    $this.find('.form-chf-numeric').each(function (i, el) {
      var $el = (0, _jquery2.default)(el);
      $el.val($el.autoNumeric('get'));
    });

    $this.find('.form-surface-numeric').each(function (i, el) {
      var $el = (0, _jquery2.default)(el);
      $el.val($el.autoNumeric('get'));
    });

    $this.find('.form-percent-numeric').each(function (i, el) {
      var $el = (0, _jquery2.default)(el);
      $el.val($el.autoNumeric('get'));
    });
  });
}

}).call(this,typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{}],10:[function(require,module,exports){
(function (global){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.organic_generate = organic_generate;

var _jquery = (typeof window !== "undefined" ? window['jQuery'] : typeof global !== "undefined" ? global['jQuery'] : null);

var _jquery2 = _interopRequireDefault(_jquery);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* global TimelineLite, Sine */

function organic_generate() {
  (0, _jquery2.default)('.organic-lines').organicJS();
}

(function ($) {

  // jQuery Object
  $.OrganicJS = function (el, options) {
    // To avoid scope issues, use 'base' instead of 'this'
    // to reference this class from internal events and functions.
    var base = this;
    var $container = null;

    var styles = {
      'big': { size: 4, duration: 25 },
      'small': { size: 1, duration: 15 }
    };

    var patterns = [{ start: 'M1920,150 c-836, 217-1138-228-1920-8', end: 'M1920,121 C1074-171,802,527,0,0' }, { start: 'M1920,121 C1074-171,802,527,0,0', end: 'M1920,150 c-836, 217-1138-228-1920-8' }, { start: 'M1920,150 c-836, 217-500-228-1920-8', end: 'M1920,121 C500-171,802,527,0,0' }];

    // Access to jQuery and DOM versions of element
    base.$el = $(el);
    base.el = el;

    // Add a reverse reference to the DOM object
    base.$el.data('OrganicJS', base);

    base.init = function () {
      base.options = $.extend({}, $.OrganicJS.defaultOptions, options);

      base.$el.addClass('organicjs');
      $container = $('<div class="organicjs-container">');
      base.$el.append($container);

      for (var i = 0; i < base.options.big; i++) {
        var pattern = _getPattern();
        var $svg = base.generate('big', pattern.start, pattern.end);
        $container.append($svg);
      }

      for (var _i = 0; _i < base.options.small; _i++) {
        var _pattern = _getPattern();
        var _$svg = base.generate('small', _pattern.start, _pattern.end);
        $container.append(_$svg);
      }
    };

    /**
    * generate an organic line
    * @method function
    * @param  {[type]} size  [description]
    * @param  {[type]} start [description]
    * @param  {[type]} end   [description]
    * @return {[type]}       [description]
    */
    base.generate = function (size, start, end) {
      var $svg = _svg('svg', { viewBox: '0 0 1920 220', class: 'path-' + size });
      var id = _rand_id();

      var $path = _svg('path', { id: id, fill: 'none', stroke: base.options.color, 'stroke-width': styles[size].size, 'vector-effect': 'non-scaling-stroke', 'd': start });

      $svg.append($path);

      $(document).ready(function () {
        var tl = new TimelineLite();
        // let path = document.getElementById(id);
        tl.to($path, styles[size].duration, { morphSVG: end, repeat: -1, yoyo: true, ease: Sine.easeInOut });
      });

      return $svg;
    };

    /**
    * Creates svg tag, returned as jQuery object
    * @method _svg
    * @param  {[type]} tag   [description]
    * @param  {[type]} attrs [description]
    * @return {[type]}       [description]
    */
    function _svg(tag, attrs) {
      var elem = document.createElementNS('http://www.w3.org/2000/svg', tag);
      for (var k in attrs) {
        elem.setAttribute(k, attrs[k]);
      }
      return $(elem);
    }

    function _getPattern() {
      var rand = Math.random() * patterns.length | 0;
      var pattern = patterns[rand];
      patterns.splice(rand, 1);
      return pattern;
    }

    function _rand_id() {
      return Math.random().toString(36).substr(2, 10);
    }

    // Run initializer
    base.init();
  };

  $.OrganicJS.defaultOptions = {
    big: '1',
    small: '2',
    color: '#CBB900'
  };

  $.fn.organicJS = function (options) {
    return this.each(function () {
      new $.OrganicJS(this, options);
    });
  };
})(jQuery);

}).call(this,typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{}],11:[function(require,module,exports){
(function (global){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.popover = popover;

var _jquery = (typeof window !== "undefined" ? window['jQuery'] : typeof global !== "undefined" ? global['jQuery'] : null);

var _jquery2 = _interopRequireDefault(_jquery);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function popover() {
  (0, _jquery2.default)('[data-toggle="popover"]').popover();
}

}).call(this,typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{}],12:[function(require,module,exports){
(function (global){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.selectize = selectize;

var _jquery = (typeof window !== "undefined" ? window['jQuery'] : typeof global !== "undefined" ? global['jQuery'] : null);

var _jquery2 = _interopRequireDefault(_jquery);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function selectize() {
  var $selectize = (0, _jquery2.default)('select.selectize');
  if ($selectize.length > 0) {
    var options = (0, _jquery2.default)('select.selectize').data('options');
    $selectize.selectize({
      plugins: ['remove_button'],
      persist: false,
      render: {
        option: function option(data, escape) {
          if ((0, _jquery2.default)('select.selectize').is('[data-description]') && typeof data.description !== 'undefined') {
            return '<div>' + escape(data.name) + ' <div class="text-muted">' + escape(data.description) + '</div></div>';
          }
          return '<div>' + escape(data.name) + '</div>';
        },
        item: function item(data, escape) {
          return '<span class="selectize-item"><span>' + escape(data.name) + '</span></span>';
        }
      },
      options: options
    });
  }
}

}).call(this,typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{}],13:[function(require,module,exports){
(function (global){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.slider = slider;

var _jquery = (typeof window !== "undefined" ? window['jQuery'] : typeof global !== "undefined" ? global['jQuery'] : null);

var _jquery2 = _interopRequireDefault(_jquery);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function slider() {
  (0, _jquery2.default)(document).ready(function () {
    // Check if jQuery ui is enable
    if (_jquery2.default.ui && _jquery2.default.ui.slider) {
      // Override default option for that the max value of slider is max value setted and no more value of near step
      _jquery2.default.extend(_jquery2.default.ui.slider.prototype, {
        _calculateNewMax: function _calculateNewMax() {
          this.max = this.options.max;
        }
      });

      // Add slider to each div with slider class
      (0, _jquery2.default)('.slider').each(function (index, element) {
        // Get the JQuery element and the input with the slider
        element = (0, _jquery2.default)(element);
        var input = element.closest('.form-group').find('input');
        var maxValue = Number(element.data('max'));

        // Init slider for this element
        element.slider({
          orientation: element.hasClass('slider-vertical') ? 'vertical' : 'horizontal',
          range: 'min',
          max: maxValue,
          min: Number(element.data('min')),
          step: Number(element.data('step')),
          value: input.length > 0 ? input.autoNumeric('get') : Number(element.data('value')),
          animate: 100,
          disabled: element.hasClass('disabled'),
          // For update input
          slide: function slide(event, ui) {
            // To be sure that slide don't go out of slider max value (sometimes it did when the last step wasn't a full step)
            if (ui.value > maxValue) {
              ui.value = maxValue;
            }

            if (input.length > 0) {
              input.autoNumeric('set', ui.value);
            }
          }
        });

        if (input.length > 0) {
          // Listen change event for update slider
          input.change(function () {
            element.slider('value', input.autoNumeric('get'));
          });
        }
      });
    }
  });
}

}).call(this,typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{}],14:[function(require,module,exports){
(function (global){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.smoothscroll_load = smoothscroll_load;
exports.smoothscroll_click = smoothscroll_click;

var _jquery = (typeof window !== "undefined" ? window['jQuery'] : typeof global !== "undefined" ? global['jQuery'] : null);

var _jquery2 = _interopRequireDefault(_jquery);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function smoothscroll_load() {
  setTimeout(function () {
    if (location.hash) {
      /* we need to scroll to the top of the window first, because the browser will always jump to the anchor first before JavaScript is ready, thanks Stack Overflow: http://stackoverflow.com/a/3659116 */
      window.scrollTo(0, 0);
      var hash = location.hash.split('#');
      smoothscroll_to((0, _jquery2.default)('#' + hash[1]));
    }
  }, 1);
}

function smoothscroll_click() {
  (0, _jquery2.default)('a[href*=#]:not([href=#])').click(function () {
    if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
      smoothscroll_to((0, _jquery2.default)(this.hash));
      return false;
    }
  });
}

var smoothscroll_to = function smoothscroll_to(dest) {
  var offset = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 100;

  var target = dest.length ? dest : (0, _jquery2.default)('[name=' + this.hash.slice(1) + ']');
  if (target.length) {
    (0, _jquery2.default)('html,body').animate({
      scrollTop: target.offset().top - offset
    }, 1000);
  }
};

}).call(this,typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{}]},{},[3])
//# sourceMappingURL=bundle.js.map
