import $ from 'jquery';

export function input_dynamic_label () {

  $(document).on('keypress', '.form-group input', function() {
    let $this = $(this),
        $group = $this.parents('.form-group'),
        $label = $group.find('label');

    // Check the label is empty and value isn't
    if ($this.val().length == 0 && $label.html().length == 0) {
      $label.toggleClass('label-hidden');
      $label.html($this.attr('data-title'));
    }
  });

}
