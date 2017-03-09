import gulp from 'gulp';
import config from '../gulp_config.json';
import yargs from 'yargs';

import browserify from 'browserify';
import source from 'vinyl-source-stream';
import buffer from 'vinyl-buffer';
import babelify from 'babelify';
import browserifyshim from 'browserify-shim';

import loadPlugins from 'gulp-load-plugins';
const $ = loadPlugins();

function errorAlert(error){
  if (!yargs.argv.production) {
    $.notify.onError({title: 'JS Error', message: 'Check your terminal', sound: 'Sosumi'})(error);
    $.util.log(error.messageFormatted);
  }
  this.emit('end');
}

/**
 * Build JS
 * With error reporting on compiling (so that there's no crash)
 * And jshint check to highlight errors as we go.
 */
export const scriptsBuild = (done) => {
  if (yargs.argv.local) {
    return browserify(
      {
        entries: ['./' + config.assets + 'js/index.js'],
        debug: true
      })
      .transform(babelify.configure({
        presets: ['es2015'],
        sourceMaps: true
      }))
      .bundle()
      .on('error', errorAlert)
      .pipe(source('bundle.js'))
      .pipe(buffer())
      .pipe($.sourcemaps.init({loadMaps: true}))
          .pipe($.if(yargs.argv.production, $.uglify()))
          .on('error', errorAlert)
      .pipe(yargs.argv.production ? $.util.noop() : $.sourcemaps.write('./'))
      .pipe(gulp.dest(config.build + '/js'));
  } else {
    return browserify(
      {
        entries: ['./' + config.assets + 'js/index.js'],
        debug: true
      })
      .transform(babelify.configure({
        presets: ['es2015'],
        sourceMaps: true
      }))
      .transform(browserifyshim)
      .bundle()
      .on('error', errorAlert)
      .pipe(source('bundle.js'))
      .pipe(buffer())
      .pipe($.sourcemaps.init({loadMaps: true}))
          .pipe($.if(yargs.argv.production, $.uglify()))
          .on('error', errorAlert)
      .pipe(yargs.argv.production ? $.util.noop() : $.sourcemaps.write('./'))
      .pipe($.size({title: 'BUNDLE SIZE', showFiles: true}))
      .pipe(gulp.dest(config.build + '/js'));
  }
};

export const scriptsLint = () => {
  return gulp.src(`${config.assets}js/index.js`)
    .pipe($.plumber({errorHandler: errorAlert}))
    .pipe($.eslint())
    .pipe($.eslint.format());
};

export const scripts = gulp.series(scriptsLint, scriptsBuild);
export const scriptsTask = gulp.task('scripts', scripts);
