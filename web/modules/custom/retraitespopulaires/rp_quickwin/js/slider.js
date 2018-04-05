/**
 * This is a temp file, we will add this in the styleguide later
 */
// Override default option for that the max value of slider is max value setted and no more value of near step
jQuery.extend(jQuery.ui.slider.prototype, {
  _calculateNewMax: function () {
    this.max = this.options.max;
  }
});

jQuery( document ).ready(function() {
  // To be sure that the format is respected (when back on browser)
  jQuery('.form-chf-numeric').autoNumeric('update');

  // Add slider to each div with slider class
  jQuery('.slider').each(function(index, element) {
    // Get the JQuery element and the input with the slider
    element = jQuery(element);
    var input = element.siblings('div').find('input');
    var maxValue = Number(element.attr('max'));

    // Init slider for this element
    element.slider({
      orientation: 'horizontal',
      range: 'min',
      max: maxValue,
      min: Number(element.attr('min')),
      step: Number(element.attr('step')),
      value: input.autoNumeric('get'),
      animate: 100,
      // For update input
      slide: function (event, ui) {
        // To be sure that slide don't go out of slider max value (sometimes it did when the last step wasn't a full step)
        if (ui.value > maxValue){
          ui.value = maxValue;
        }
        input.autoNumeric('set', ui.value);
      }
    });

    // Listen change event for update slider
    input.change(function() {
      element.slider('value', input.autoNumeric('get'));
    });
  });
});