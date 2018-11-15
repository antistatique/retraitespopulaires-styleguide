import $ from 'jquery';

/**
 * This JS is only use with the CKeditor Accordion module.
 * It adds a div around the head of each tab of the accordion to make the whole head clickable.
 *
 *  @see {@link https://www.drupal.org/project/ckeditor_accordion}
 */
export function ckeditor_accordion() {

    $(document).ready(function () { // wait otherwise it's in conflict with the JS of module
        $('.ckeditor-accordion-container').find('dt').wrapInner("<div class='ckeditor-accordion-toggler'></div>");
    });
}