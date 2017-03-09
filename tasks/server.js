import gulp from 'gulp';
import config from '../gulp_config.json';
import browserSync from 'browser-sync';
import runSequence from 'run-sequence';

import loadPlugins from 'gulp-load-plugins';
const $ = loadPlugins();
const reload = browserSync.reload;

  /**
   * Serve
   */
  export const serve = () => {
     browserSync({
       server: {
         baseDir: [config.app.basedir]
       },
       open: false
     });
     gulp.watch([config.assets + 'sass/**/*.scss'], function() {
       runSequence('styles', 'metalsmith', reload);
     });
     gulp.watch([config.assets + 'sass/styleguide.scss', config.assets + 'sass/styleguide-variables.scss'], function() {
       runSequence('metalsmith-styles', 'metalsmith', reload);
     });
     gulp.watch([config.assets + 'img/**/*', config.assets + 'svg/**/*'], function() {
       runSequence('img', 'metalsmith', reload);
     });
     gulp.watch([config.assets + 'icons/**/*'], function() {
       runSequence('icons', 'metalsmith', reload);
     });
     gulp.watch([config.assets + 'js/**/*.js'], function() {
       runSequence('scripts', 'metalsmith', reload);
     });
     gulp.watch([
       config.assets + 'components/**/*.{html,hbs,md,swig}',
       config.assets + 'templates/**/*.{html,hbs,md,swig}',
       config.assets + 'docs/**/*.md',
       config.assets + 'data/**/*.{json,yml}'
     ], function() {
       runSequence('metalsmith-docs', reload);
     });
  }
