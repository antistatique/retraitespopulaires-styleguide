import $ from 'jquery';

export function slider () {
  $( document ).ready(function() {
    // Check if jQuery ui is enable
    if ($.ui.slider) {
      // Override default option for that the max value of slider is max value setted and no more value of near step
      $.extend($.ui.slider.prototype, {
        _calculateNewMax: function () {
          this.max = this.options.max;
        }
      });

      // Add slider to each div with slider class
      $('.slider').each(function (index, element) {
        // Get the JQuery element and the input with the slider
        element = $(element);
        let input = element.closest('.form-group').find('input');
        let maxValue = Number(element.data('max'));

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
          slide: function (event, ui) {
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
