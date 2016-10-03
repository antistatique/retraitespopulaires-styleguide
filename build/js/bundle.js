(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
(function (global){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.big_menu = big_menu;

var _jquery = (typeof window !== "undefined" ? window['jQuery'] : typeof global !== "undefined" ? global['jQuery'] : null);

var _jquery2 = _interopRequireDefault(_jquery);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function big_menu() {

  var $body = (0, _jquery2.default)('body'),
      $wrapper = (0, _jquery2.default)('.hamburger-wrapper'),
      $header = (0, _jquery2.default)('header'),
      $navbar = (0, _jquery2.default)('.big-menu'),
      $search = (0, _jquery2.default)('.global-search');

  $wrapper.on('click', function () {
    if ($wrapper.hasClass('active')) {
      $body.toggleClass('no-scroll');
      $header.toggleClass('active');
      $wrapper.toggleClass('active');
      $navbar.toggleClass('active');
      $search.toggleClass('active');
    } else {
      $body.toggleClass('no-scroll');
      $header.toggleClass('active');
      $navbar.css({ 'display': 'block' });
      $wrapper.toggleClass('active');
      $navbar.toggleClass('active');
      $search.toggleClass('active');
    }
  });

  /** SWIPER **/

  var $swiper = (0, _jquery2.default)('.swiper-menu');

  // This is under 992px
  if (!window.matchMedia('(min-width: 992px)').matches) {
    console.log('fixheight');
    var height = $swiper.find('.swiper-column-1').height();
    $swiper.find('.swiper-column-2, .swiper-column-3').css({ 'height': height });
  }

  /**
   * Open the correct pan and close the old one
   * @type {[type]}
   */
  $swiper.find('.swiper-list .arrow-next').on('click', function (event) {
    event.preventDefault ? event.preventDefault() : event.returnValue = false;

    // Remove the empty-state
    $swiper.find('.swiper-empty-state').not('inactive').addClass('inactive');
    setTimeout(function () {
      $swiper.find('.swiper-empty-state').remove();
    }, 250);

    // Unactive all other siblings li in the column
    (0, _jquery2.default)(this).parents('.swiper-column').find('li.active').toggleClass('active');
    // Active the clicked one
    (0, _jquery2.default)(this).parents('li').toggleClass('active');

    var $next_pane = $swiper.find('[data-list="' + (0, _jquery2.default)(this).attr('href') + '"]');
    var $next_pane_parent = $next_pane.parents('.swiper-column');
    var $next_wrapper = $next_pane_parent.parents('.swiper-column-wrapper');
    var $current_pane = (0, _jquery2.default)(this).parents('.swiper-list');

    if ($next_pane_parent.hasClass('swiper-column-3') && $next_pane_parent.hasClass('swiper-column-waiting')) {
      $next_pane_parent.removeClass('swiper-column-waiting');
    }

    // Unactive current opened pan
    $swiper.find('.swiper-list-alternative.active').not($current_pane).each(function (index, elem) {
      (0, _jquery2.default)(elem).removeClass('active');

      var $wrapper = (0, _jquery2.default)(elem).parents('.swiper-column-wrapper');
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
  $swiper.find('.swiper-list .arrow-back').on('click', function (event) {
    event.preventDefault ? event.preventDefault() : event.returnValue = false;

    var $current_pane = (0, _jquery2.default)(this).parents('.swiper-list');
    var $current_wrapper = (0, _jquery2.default)(this).parents('.swiper-column-wrapper');

    // Close current pane
    $current_pane.removeClass('active');
    setTimeout(function () {
      $current_wrapper.removeClass('active');
    }, 250);
  });
}

}).call(this,typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{}],2:[function(require,module,exports){
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
  (0, _jquery2.default)('.datepicker').datepicker({
    language: 'fr',
    format: 'dd/mm/yyyy'
  });
}

}).call(this,typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{}],3:[function(require,module,exports){
'use strict';

var _big_menu = require('./big_menu.js');

var _input_dynamic_label = require('./input_dynamic_label.js');

var _organicJS = require('./organicJS.js');

var _datepicker = require('./datepicker.js');

(function () {
  (0, _big_menu.big_menu)();
  (0, _organicJS.organic_generate)();
  (0, _input_dynamic_label.input_dynamic_label)();
  (0, _datepicker.datepicker)();
})();

},{"./big_menu.js":1,"./datepicker.js":2,"./input_dynamic_label.js":4,"./organicJS.js":5}],4:[function(require,module,exports){
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
exports.organic_generate = organic_generate;

var _jquery = (typeof window !== "undefined" ? window['jQuery'] : typeof global !== "undefined" ? global['jQuery'] : null);

var _jquery2 = _interopRequireDefault(_jquery);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

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
      'big': { size: 4, duration: 50 },
      'small': { size: 1, duration: 30 }
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

      var $path = _svg('path', { fill: 'none', stroke: base.options.color, 'stroke-width': styles[size].size, 'vector-effect': 'non-scaling-stroke', 'd': start });

      var $animate = _svg('animate', { id: 'a1', 'attributeName': 'd', values: start + ';' + end + ';' + start, begin: '0s', dur: styles[size].duration, repeatCount: 'indefinite' });

      $path.append($animate);
      $svg.append($path);

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
},{}]},{},[3])
//# sourceMappingURL=bundle.js.map
