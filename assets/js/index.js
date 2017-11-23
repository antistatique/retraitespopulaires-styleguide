import { mobile_menu } from './mobile_menu.js';
import { navbar } from './navbar.js';
import { input_dynamic_label } from './input_dynamic_label.js';
import { input_files } from './input_files.js';
import { organic_generate } from './organicJS.js';
import { datepicker } from './datepicker.js';
import { number_format } from './number_format.js';
import { smoothscroll_load } from './smoothscroll.js';
import { gallery } from './gallery.js';
import { popover } from './popover.js';
import { selectize } from './selectize.js';
import { labels } from './labels.js';

(function(){
  mobile_menu();
  navbar();
  smoothscroll_load();
  input_dynamic_label();
  input_files();
  gallery();
  organic_generate();
  datepicker();
  number_format();
  popover();
  selectize();
  labels();
}());
