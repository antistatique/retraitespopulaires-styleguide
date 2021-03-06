import $ from 'jquery';

export function selectize () {
  const $selectize = $('select.selectize');
  if ($selectize.length > 0) {
    const options = $('select.selectize').data('options');
    $selectize.selectize({
      plugins: ['remove_button'],
      persist: false,
      render: {
        option: function(data, escape) {
          if ($('select.selectize').is('[data-description]') && typeof data.description !== 'undefined') {
            return `<div>${escape(data.name)} <div class="text-muted">${escape(data.description)}</div></div>`;
          }
          return `<div>${escape(data.name)}</div>`;
        },
        item: function(data, escape) {
          return `<span class="selectize-item"><span>${escape(data.name)}</span></span>`
        }
      },
      options: options,
    });
  }
}
