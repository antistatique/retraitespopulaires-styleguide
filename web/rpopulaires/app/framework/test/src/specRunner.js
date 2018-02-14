(function() {
  'use strict';

   var allTestFiles = [];
   var TEST_REGEXP = /(spec|test)\.js$/i;

   Object.keys(window.__karma__.files).forEach(function(file) {
      if (TEST_REGEXP.test(file)) {
         // Normalize paths to RequireJS module names.
         allTestFiles.push(file);
      }
   });

  // Configure RequireJS to shim Jasmine
  require.config({
      baseUrl: '.',
      paths: {
         'logger':                     '/base/app/lib/logger/logger.min',
         'jquery-flot':                '/base/app/lib/flot-0.8.2/jquery.flot.min',
         'jquery-flot-stack':          '/base/app/lib/flot-0.8.2/jquery.flot.stack.min',
         'jquery-flot-axislabels':     '/base/app/lib/flot-0.8.2/jquery.flot.axislabels',
         'jquery-flot-pie':            '/base/app/lib/flot-0.8.2/jquery.flot.pie.min',
         'jquery-flot-resize':         '/base/app/lib/flot-0.8.2/jquery.flot.resize',
         'easing':                     '/base/app/lib/easing/easing',
         'common-series-utilities':    '/base/app/src/common/chart/series-utilities',
         'common-chart-animator':      '/base/app/src/common/chart/chart-animator',
         'common-chart-interactivity': '/base/app/src/common/chart/chart-interactivity',
         'common-chart-utilities':     '/base/app/src/common/chart/chart-utilities',
         'common-bar-chart-delegate':  '/base/app/src/common/chart/bar-chart-delegate',
         'base-chart':                 '/base/app/src/common/chart/base-chart',
         'base-bar-chart':             '/base/app/src/common/chart/base-bar-chart',
         'common-localization' :       '/base/app/src/common/localization',
         'common-currency-formatter' : '/base/app/src/common/currency-formatter',
         'common-numeric-parameter' :  '/base/app/src/common/numeric-parameter',
         'common-bar-chart' :          '/base/app/src/common/chart/bar-chart',
         'common-object-utilities':    '/base/app/src/common/object-utilities',
         'version-transformations' :   '/base/app/src/common/version-transformations'
      },
      shim: {
         'jquery-flot': {
            exports: 'jquery_flot'
         },
         'jquery-flot-stack': {
            exports: 'jquery_flot_stack',
            deps: ['jquery-flot']
         },
         'jquery-flot-axislabels': {
            exports: 'jquery_flot_axislabels',
            deps: ['jquery-flot-stack']
         },
         'jquery-flot-pie': {
            exports: 'jquery_flot_pie',
            deps: ['jquery-flot-axislabels']
         },
         'jquery-flot-resize': {
            exports: 'jquery_flot_resize',
            deps: ['jquery-flot-pie']
         },
         'easing': {
            exports: 'easing',
            deps: []
         }
      },
      deps: allTestFiles,  // add tests array to load our tests
      callback: window.__karma__.start  // start tests once Require.js is done
  });
})();
