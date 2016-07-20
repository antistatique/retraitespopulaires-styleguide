'use strict';

(function($){

  // Init
  $(function() {
    $('.organic-lines').organicJS();
  });

  // jQuery Object
  $.OrganicJS = function(el, options){
    // To avoid scope issues, use 'base' instead of 'this'
    // to reference this class from internal events and functions.
    const base = this;
    let $container = null;

    const styles = {
      'big'  : {size: 4, duration: 50},
      'small': {size: 1, duration: 30}
    };

    const patterns = [
      {start: 'M1920,150 c-836, 217-1138-228-1920-8', end: 'M1920,121 C1074-171,802,527,0,0'},
      {start: 'M1920,121 C1074-171,802,527,0,0', end: 'M1920,150 c-836, 217-1138-228-1920-8'},
      {start: 'M1920,150 c-836, 217-500-228-1920-8', end: 'M1920,121 C500-171,802,527,0,0'}
    ];

    // Access to jQuery and DOM versions of element
    base.$el = $(el);
    base.el = el;

    // Add a reverse reference to the DOM object
    base.$el.data('OrganicJS', base);

    base.init = function(){
      base.options = $.extend({},$.OrganicJS.defaultOptions, options);

      base.$el.addClass('organicjs');
      $container = $('<div class="organicjs-container">');
      base.$el.append($container);

      for (let i = 0; i < base.options.big; i++) {
        let pattern = _getPattern();
        let $svg = base.generate('big', pattern.start, pattern.end);
        $container.append($svg);
      }

      for (let i = 0; i < base.options.small; i++) {
        let pattern = _getPattern();
        let $svg = base.generate('small', pattern.start, pattern.end);
        $container.append($svg);
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
    base.generate = function(size, start, end){
      const $svg = _svg('svg', {viewBox: '0 0 1440 220', class:'path-'+size});

      const $path = _svg('path', {fill: 'none', stroke: base.options.color, 'stroke-width':styles[size].size, 'vector-effect':'non-scaling-stroke', 'd': start});

      const $animate = _svg('animate', {id: 'a1', 'attributeName': 'd', values:start+';'+end+';'+start, begin:'0s', dur:styles[size].duration, repeatCount:'indefinite'});

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
      const elem = document.createElementNS('http://www.w3.org/2000/svg', tag);
      for (let k in attrs) {
        elem.setAttribute(k, attrs[k]);
      }
      return $(elem);
    }

    function _getPattern() {
      const rand = (Math.random() * patterns.length) | 0;
      const pattern = patterns[rand];
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

  $.fn.organicJS = function(options){
    return this.each(function(){
      (new $.OrganicJS(this, options));
    });
  };

})(jQuery);
