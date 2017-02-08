import { big_menu } from './big_menu.js';
import { navbar } from './navbar.js';
import { input_dynamic_label } from './input_dynamic_label.js';
import { input_files } from './input_files.js';
import { organic_generate } from './organicJS.js';
import { datepicker } from './datepicker.js';
import { number_format } from './number_format.js';
import { smoothscroll_load } from './smoothscroll.js';
import { gallery } from './gallery.js';

(function(){
  big_menu();
  navbar();
  smoothscroll_load();
  organic_generate();
  input_dynamic_label();
  input_files();
  datepicker();
  number_format();
  gallery();
}());
