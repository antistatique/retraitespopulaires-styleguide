// Karma configuration
// Generated on Mon Jul 06 2015 16:31:45 GMT-0300 (Argentina Standard Time)

module.exports = function(config) {
  config.set({

      // base path that will be used to resolve all patterns (eg. files, exclude)
      basePath: '../..',


      // frameworks to use
      // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
      frameworks: ['jasmine', 'requirejs', 'jquery-1.11.0'],

      plugins: [
        // Karma will require() these plugins
        'karma-jasmine',
        'karma-requirejs',
        'karma-phantomjs-launcher',
        'karma-chrome-launcher',
        'karma-firefox-launcher',
        'karma-junit-reporter',
        'karma-jquery'
      ],


      // list of files / patterns to load in the browser
      files: [
         'test/src/specRunner.js',
         { pattern: 'app/lib/logger/logger.min.js', included: false},
         { pattern: 'app/lib/flot-0.8.2/jquery.flot.min.js', included: false},
         { pattern: 'app/lib/flot-0.8.2/jquery.flot.stack.min.js', included: false},
         { pattern: 'app/lib/flot-0.8.2/jquery.flot.axislabels.js', included: false},
         { pattern: 'app/lib/flot-0.8.2/jquery.flot.pie.min.js', included: false},
         { pattern: 'app/lib/flot-0.8.2/jquery.flot.resize.js', included: false},
         { pattern: 'app/lib/easing/easing.js', included: false},
         { pattern: 'app/src/common/localization.js', included: false},
         { pattern: 'app/src/common/currency-formatter.js', included: false},
         { pattern: 'app/src/common/object-utilities.js', included: false},

         { pattern: 'app/src/common/chart/series-utilities.js', included: false},
         { pattern: 'app/src/common/chart/chart-animator.js', included: false},
         { pattern: 'app/src/common/chart/chart-interactivity.js', included: false},
         { pattern: 'app/src/common/chart/chart-utilities.js', included: false},
         { pattern: 'app/src/common/chart/bar-chart-delegate.js', included: false},
         { pattern: 'app/src/common/chart/base-chart.js', included: false},
         { pattern: 'app/src/common/chart/base-bar-chart.js', included: false},
         { pattern: 'app/src/common/chart/bar-chart.js', included: false},

         { pattern: 'app/src/common/numeric-parameter.js', included: false},
         { pattern: 'app/src/common/version-transformations.js', included: false},
         { pattern: 'test/src/common/common-localization.spec.js', included: false},
         { pattern: 'test/src/common/common-currency-formatter.spec.js', included: false},
         { pattern: 'test/src/common/common-bar-chart.spec.js', included: false},
         { pattern: 'test/src/common/common-object-utilities-extend-deep.spec.js', included: false},
         { pattern: 'test/src/common/common-object-utilities.spec.js', included: false},
         { pattern: 'test/src/common/version-transformations.spec.js', included: false}
      ],


      // list of files to exclude
      exclude: [
      ],


      // preprocess matching files before serving them to the browser
      // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
      preprocessors: {
      },


      // test results reporter to use
      // possible values: 'dots', 'progress'
      // available reporters: https://npmjs.org/browse/keyword/karma-reporter
      reporters: ['dots', 'junit'],

      junitReporter: {
        outputFile: 'test/logs/test-results.xml'
      },

      // web server port
      port: 9876,


      // enable / disable colors in the output (reporters and logs)
      colors: true,


      // level of logging
      // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
      logLevel: config.LOG_INFO,


      // enable / disable watching file and executing tests whenever any file changes
      autoWatch: true,


      // start these browsers
      // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
      browsers: ['PhantomJS'],


      // Continuous Integration mode
      // if true, Karma captures browsers, runs the tests and exits
      singleRun: true,

      captureTimeout: 6000
  });
};
