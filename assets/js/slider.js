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
      $('.slider').each(function (index, element) {
        // Get the JQuery element and the input with the slider
        element = $(element);

        // Get the data parameters
        let input = element.closest('.form-group').find('input');
        let maxValue = Number(element.data('max'));
        let minValue = Number(element.data('min'));
        let step = Number(element.data('step'));
        let labels = element.data('labels');
        let range = 'min';
        let showPips = element.data('show-pips');

        // Check if labels is an object
        if (labels && typeof labels === 'string') {
          console.error('The labels string seems to be badly declared.');
          labels = null;
        }

        // The range type can be null so set value only if undefined
        if (element.data('range') !== undefined) {
          range = element.data('range');

          // If range is null add class no-range.
          if (range == null) {
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
            // Calculate the position of the label.
            let percent = (labelValue - minValue) / (maxValue - minValue) * 100;
            let label = labels[labelValue];

            // Create label and add it to the slider.
            let newEl = $('<div class="ui-slider-pip" data-active-value="' + labelValue + '"><span class="ui-slider-line"></span><span class="ui-slider-label">' + label + '</span></div>')
                .css('left', percent + '%');
            element.append(newEl);
          }
        }

        // Show pips on each step
        if (showPips) {
          for (let i = minValue; i <= maxValue; i += step) {
            // Only show if there's no label at the position.
            if (!labels || !(labels.hasOwnProperty(i))) {
              // Calculate the position of the pips.
              let percent = (i - minValue) / (maxValue - minValue) * 100;

              // Create pips and add it to the slider.
              let newEl = $('<div class="ui-slider-pip" data-active-value="' + i + '"><span class="ui-slider-line"></span></div>')
                  .css('left', percent + '%');
              element.append(newEl);
            }
          }
        }

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
