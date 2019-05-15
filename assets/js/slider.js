import $ from 'jquery';

export function slider () {
  $( document ).ready(function() {
    // Check if jQuery ui is enable
    if ($.ui && $.ui.slider) {
      // Override default option for that the max value of slider is max value setted and no more value of near step
      $.extend($.ui.slider.prototype, {
        _calculateNewMax: function () {
          this.max = this.options.max;
        }
      });

      // Add slider to each div with slider class
      $('.slider').generateSlider();
    }
  });
}

(function ($) {
  $.fn.generateSlider = function() {
    this.each(function (index, element) {
      // Get the JQuery element and the input with the slider
      element = $(element);

      // Get the data parameters
      let input = element.closest('.form-group').find('input');
      let currentValue = 0;
      let maxValue = Number(element.data('max'));
      let minValue = Number(element.data('min'));
      let step = Number(element.data('step'));
      let labels = element.data('labels');
      let range = 'min';
      let showPips = element.data('show-pips');
      let selected = element.data('selected-label');
      let isAutoNumeric = false;

      // Get current value from input if there's is one otherwise get from data on slider.
      if (input.length > 0 && input.val()) {
        // Verify if autoNumeric is set on this input.
        if (input.autoNumeric('getSettings')) {
          currentValue = Number(input.autoNumeric('get'));
          isAutoNumeric = true;
        }
        else {
          currentValue = Number(input.val());
        }
      }
      else {
        currentValue = Number(element.data('value'));
      }

      // To be sure that it's a number.
      if (isNaN(currentValue)) {
        currentValue = 0;
      }


      // Check if labels is an object
      if (labels && typeof labels === 'string') {
        console.error('The labels string seems to be badly declared.');
        labels = null;
      }

      // The range type can be null so set value only if undefined
      if (element.data('range') !== undefined) {
        range = element.data('range');

        // If range is null add class no-range.
        if (range === 'no-range') {
          range = null;
          element.addClass('no-range');
        }
      }

      // Init slider for this element
      element.slider({
        orientation: element.hasClass('slider-vertical') ? 'vertical' : 'horizontal',
        range: range,
        max: maxValue,
        min: minValue,
        step: step,
        value: currentValue,
        animate: 100,
        disabled: element.hasClass('disabled'),
        // For update input
        slide: function (event, ui) {
          // To be sure that slide don't go out of slider max value (sometimes it did when the last step wasn't a full step)
          if (ui.value > maxValue) {
            ui.value = maxValue;
          }

          if (input.length > 0) {
            isAutoNumeric ? input.autoNumeric('set', ui.value) : input.val(ui.value);
            input.change();
          }

          // Add active class to the only label
          element.children('.ui-slider-pip').removeClass('active');
          element.children('.ui-slider-pip[data-active-value="' + ui.value + '"]').addClass('active');
        }
      });

      // Show labels.
      if (labels) {
        // Add margin bottom.
        element.addClass('labels');

        for (let labelValue in labels) {
          newPips(labelValue);
        }
      }

      // Show pips on each step
      if (showPips) {
        for (let i = minValue; i <= maxValue; i += step) {
          // Only show if there's no label at the position.
          if (!labels || !(labels.hasOwnProperty(i))) {
            newPips(i);
          }
        }
      }

      if (input.length > 0) {
        // Listen change event for update slider
        input.change(function () {
          let val = isAutoNumeric ? input.autoNumeric('get') : input.val();
          element.slider('value', val);
        });
      }

      // Function to generate the pips.
      function newPips(value) {
        value = Number(value);

        // Calculate the position of the pip.
        let percent = (value - minValue) / (maxValue - minValue) * 100 - 5;

        // Create pip.
        let newEl = $('<div class="ui-slider-pip" data-active-value="' + value + '"><span class="ui-slider-line"></span></div>')
            .css('left', percent + '%');

        // If there's a label add it to the pip.
        if (labels[value]) {
          newEl.append('<span class="ui-slider-label">' + labels[value] + '</span>');
        }

        // If it is the current selected value set to active.
        if (value === currentValue) {
          newEl.addClass('active');

          // If current value is selected.
          if (selected) {
            newEl.addClass('selected');
          }
        }

        // Add the pip to the slider.
        element.append(newEl);
      }
    });
  };
})(jQuery);
