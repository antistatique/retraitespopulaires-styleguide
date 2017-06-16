import gulp from 'gulp';
import config from '../gulp_config.json';

import loadPlugins from 'gulp-load-plugins';
const $ = loadPlugins();

/**
 * Copy favicons from styleguide into build folder
 */
export const favicons = () => {
  return gulp.src(config.favicons)
    .pipe($.size({title: 'FAVICONS'}))
    .pipe(gulp.dest(`${config.build}favicons`));
};

export const faviconsTask = gulp.task('favicons', favicons);
