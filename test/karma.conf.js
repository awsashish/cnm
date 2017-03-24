// Karma configuration
// Generated on 2016-08-10

module.exports = function(config) {
  'use strict';

  config.set({
    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: true,

    // base path, that will be used to resolve files and exclude
    basePath: '../',

    browserNoActivityTimeout: 30000,

    // testing framework to use (jasmine/mocha/qunit/...)
    // as well as any additional frameworks (requirejs/chai/sinon/...)
    frameworks: [
      'jasmine'
    ], 

    // list of files / patterns to load in the browser
    files: [
      // bower:js
      'bower_components/jquery/dist/jquery.js',
      'bower_components/angular/angular.js',
      'bower_components/bootstrap/dist/js/bootstrap.js',
      'bower_components/angular-animate/angular-animate.js',
      'bower_components/angular-cookies/angular-cookies.js',
      'bower_components/angular-resource/angular-resource.js',
      'bower_components/angular-route/angular-route.js',
      'bower_components/angular-sanitize/angular-sanitize.js',
      'bower_components/angular-touch/angular-touch.js',
      'bower_components/moment/moment.js',
      'bower_components/angular-ui-router/release/angular-ui-router.js',
      'bower_components/tg-angular-validator/dist/angular-validator.js',
      'bower_components/underscore/underscore.js',
      'bower_components/ngstorage/ngStorage.js',
      'bower_components/angular-bootstrap/ui-bootstrap-tpls.js',
      'bower_components/jquery-ui/jquery-ui.js',
      'bower_components/angular-ui-slider/src/slider.js',
      'bower_components/angular-breadcrumb/release/angular-breadcrumb.js',
      'bower_components/angular-country-state-select/dist/angular-country-state-select.js',
      'bower_components/clipboard/dist/clipboard.js',
      'bower_components/ngclipboard/dist/ngclipboard.js',
      'bower_components/humanize-duration/humanize-duration.js',
      'bower_components/angular-timer/dist/angular-timer.js',
      'bower_components/moment-timezone/builds/moment-timezone-with-data-2010-2020.js',
      'bower_components/ng-img-crop/compile/minified/ng-img-crop.js',
      'bower_components/ng-excel/ngExcel.js',
      'bower_components/angular-filter/dist/angular-filter.js',
      'bower_components/rangy/rangy-core.js',
      'bower_components/rangy/rangy-classapplier.js',
      'bower_components/rangy/rangy-highlighter.js',
      'bower_components/rangy/rangy-selectionsaverestore.js',
      'bower_components/rangy/rangy-serializer.js',
      'bower_components/rangy/rangy-textrange.js',
      'bower_components/textAngular/dist/textAngular.js',
      'bower_components/textAngular/dist/textAngular-sanitize.js',
      'bower_components/textAngular/dist/textAngularSetup.js',
      'bower_components/angular-aria/angular-aria.js',
      'bower_components/angular-messages/angular-messages.js',
      'bower_components/angular-material/angular-material.js',
      'bower_components/angular-material-data-table/dist/md-data-table.js',
      'bower_components/js-xlsx/dist/xlsx.core.min.js',
      'bower_components/file-saver-saveas-js/FileSaver.js',
      'bower_components/angular-xlsx/angular-xlsx.js',
      'bower_components/summernote/dist/summernote.js',
      'bower_components/angular-summernote/dist/angular-summernote.js',
      'bower_components/angular-youtube-mb/src/angular-youtube-embed.js',
      'bower_components/angular-mocks/angular-mocks.js',
      // endbower
      'app/scripts/**/*.js',
      'test/spec/**/*.js',
      'app/views/**/*.html'
    ],

    preprocessors: {
      'app/views/**/*.html': 'ng-html2js'
    },

    ngHtml2JsPreprocessor: {
      // strip app from the file path
      stripPrefix: 'app/'
    },

    // list of files / patterns to exclude
    exclude: [
    ],

    // web server port
    port: 8080,

    // Start these browsers, currently available:
    // - Chrome
    // - ChromeCanary
    // - Firefox
    // - Opera
    // - Safari (only Mac)
    // - PhantomJS
    // - IE (only Windows)
    browsers: [
      'PhantomJS'
    ],

    // Which plugins to enable
    plugins: [
      'karma-phantomjs-launcher',
      'karma-jasmine',
      'karma-ng-html2js-preprocessor'
    ],

    // Continuous Integration mode
    // if true, it capture browsers, run tests and exit
    singleRun: false,

    colors: true,

    // level of logging
    // possible values: LOG_DISABLE || LOG_ERROR || LOG_WARN || LOG_INFO || LOG_DEBUG
    logLevel: config.LOG_INFO,

    // Uncomment the following lines if you are using grunt's server to run the tests
    // proxies: {
    //   '/': 'http://localhost:9000/'
    // },
    // URL root prevent conflicts with the site root
    // urlRoot: '_karma_'
  });
};
