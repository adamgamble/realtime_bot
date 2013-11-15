module.exports = function(config) {
  config.set({
    basePath: '',
    exclude: [],
    port: 8080,
    runnerPort: 9100,
    colors: true,
    autoWatch: true,
    logLevel: config.LOG_INFO,
    browsers: ['Chrome'],
    captureTimeout: 5000,
    singleRun: false,

    files: [
      'app/bower_components/jquery/jquery.js',
      'app/bower_components/underscore/underscore.js',
      'app/bower_components/d3/d3.js',
      'app/bower_components/angular/angular.js',
      'app/bower_components/angular-mocks/angular-mocks.js',
      'app/bower_components/angular-resource/angular-resource.js',
      'app/bower_components/angular-cookies/angular-cookies.js',
      'app/bower_components/angular-sanitize/angular-sanitize.js',
      'app/bower_components/angular-route/angular-route.js',
      'app/scripts/*.js',
      'app/scripts/**/*.js',
      'test/mock/**/*.js',
      'test/spec/**/*.js',
      // include the templates directory
      'app/templates/*.html'
    ],

    preprocessors: {
      // generate js files from html templates to expose them during testing.
      'app/templates/*.html': ['ng-html2js'],
      'app/scripts/{controllers/*,directives/*,models/*,services/*, *}.js': ['coverage']
    },

    coverageReporter: {
      type: 'html',
      dir: 'coverage/'
    },

    plugins: [
      "karma-jasmine",
      "karma-chrome-launcher",
      "karma-phantomjs-launcher",
      "karma-ng-html2js-preprocessor",
      "karma-coverage"
    ],

    frameworks: [
      'jasmine',
    ],

    ngHtml2JsPreprocessor: {
      // strip this from the file path
      stripPrefix: 'app/',

      // setting this option will create only a single module that contains templates
      // from all the files, so you can load them all with module('foo')
      moduleName: 'templates'
    }
  });
};
