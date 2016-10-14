/**
 * @file insert Non-Breaking SPace for CKEditor
 * Copyright (C) 2016 Kevin Wenger of Antistatique
 * Create a command and enable the Ctrl+Space shortcut to insert a non-breaking space in CKEditor
 * Also add a non-breaking space button
 *
 */
 (function ($, Drupal, CKEDITOR) {

   'use strict';

   CKEDITOR.plugins.add('nbsp', {
     icons: 'nbsp',
     hidpi: true,

     init: function (editor) {

       // Insert &nbsp; if Ctrl+Space is pressed:
       editor.addCommand('insertNbsp', {
         exec: function (editor) {
           editor.insertHtml('&nbsp;');
         }
       });
       editor.setKeystroke(CKEDITOR.CTRL + 32 /* space */, 'insertNbsp');

       // Register the toolbar button.
       if (editor.ui.addButton) {
         editor.ui.addButton('DrupalNbsp', {
           label: Drupal.t('Non-breaking space'),
           command: 'insertNbsp',
           icon: this.path + 'icons/nbsp.png'
         });
       }
     }
   });

 })(jQuery, Drupal, CKEDITOR);
