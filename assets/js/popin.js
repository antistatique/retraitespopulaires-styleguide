import $ from 'jquery';

export function popin () {
  // Move popin to show on desktop
  $(document).on('click', '[data-toggle="popins-collapse"]', function (e) {
    let $this = $(this);

    $this.parents('.popin-container.popin-container-collapsing').find('.popin-collapse').collapse('hide');
    $this.parents('.popin-container').toggleClass('popin-container-collapse popin-container-collapsing');
  });

  // Move popin when a collapse is open
  $(document).on('click', '[data-toggle="collapse"]', function (e) {
    let $this = $(this);
    $this.parents('.popin-container').removeClass('popin-container-collapse');
    $this.parents('.popin-container').addClass('popin-container-collapsing');
  });

  // Hide current showed element on mobile
  $(document).on('click', '[data-toggle="popin-collapse-hide-mobile"]', function (e) {
    let $this = $(this);

    $this.parents('.popin').addClass('hidden');
    $this.parents('.popin-container').children('.popin').removeClass('show');

    let dataTarget = $this.parents('.popin').find('[data-toggle="popin-collapse-show-mobile"]').attr('data-target');
    if (dataTarget) {
      $(dataTarget).addClass('hidden');
    }
  });

  // Show clicked element on mobile
  $(document).on('click', '[data-toggle="popin-collapse-show-mobile"]', function (e){
    let $this = $(this);
    let $currentShow = $this.parents('.popin').siblings('.show');

    if ($currentShow.length > 0){
      $currentShow.removeClass('show');
      $currentShow.find('.popin-collapse').collapse('hide');
      let dataTarget = $currentShow.find('[data-toggle="popin-collapse-show-mobile"]').attr('data-target');
      if (dataTarget) {
        $(dataTarget).addClass('hidden');
      }
    }

    if ($this.attr('data-target')) {
      $($this.attr('data-target')).toggleClass('hidden');
    }

    $this.parents('.popin').addClass('show');
    $this.parents('.popin').children('.popin-collapse').collapse('show');
  });
}
