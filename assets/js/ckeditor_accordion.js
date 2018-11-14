import $ from 'jquery';

export function ckeditor_accordion() {

    $(document).ready(function () { // wait otherwise it's in conflict with the JS of module
        $('.ckeditor-accordion-container').find('dt').wrapInner("<div class='ckeditor-accordion-toggler'></div>");
    });
}