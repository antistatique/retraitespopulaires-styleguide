/**
 * Import plugins
 */
import gulp from 'gulp';
import config from './gulp_config.json';
import yargs from 'yargs';

import NodeESModuleLoader from 'node-es-module-loader';
const loader = new NodeESModuleLoader();

import loadPlugins from 'gulp-load-plugins';
const $ = loadPlugins();

import { vendors, vendorsTask } from './tasks/vendors';
import { img, imgTask } from './tasks/images';
import { styles, stylesTask, stylesLintTask } from './tasks/styles';
import { scripts, scriptsTask } from './tasks/scripts';
import { icons, iconsTask } from './tasks/icons';
import { favicons, faviconsTask } from './tasks/favicons';
import { clean, cleanTask } from './tasks/clean';
import { single, singleTask } from './tasks/single';
import { deploy, deployTask } from './tasks/deploy';




const conditionalStyleguide = '';
const inprod = done => done();

/**
 * Init project
 */
gulp.task('init', function() {
  return gulp.src('node_modules/bootstrap/scss/_variables.scss')
    .pipe($.rename('bootstrap-variables.scss'))
    .pipe(gulp.dest(`${config.assets}sass/`));
});

/**
* Task to build assets on production server
*/
const build = gulp.series(clean, vendors, single, styles, scripts, img, icons, favicons);
gulp.task('build', build);

/**
 * Default task
 */
const defaultFunc = (done, isServe) => loader.import(conditionalStyleguide)
 .then(m => {
   $.util.log('DEVELOPMENT MODE');
   if (isServe) {
     done(gulp.series(build, favicons));
   } else {
     done(gulp.series(build, favicons));
   }
 })
 .catch(err => {
   $.util.log('PRODUCTION MODE');
   if (isServe) {
     done(gulp.series(build, favicons));
   } else {
     done(gulp.series(build, favicons));
   }
 });

gulp.task('default', () => defaultFunc(res => res(), false));
