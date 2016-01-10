'use strict';

module.exports = function(config) {
  config.set({
    frameworks: ['mocha', 'chai','browserify'],

    preprocessors: {
      'app/tests/*.js': ['browserify'] //Mention path as per your test js folder
    },

    plugins : ['karma-mocha', 'karma-browserify', 'karma-chai'],

    files: [
      'node_modules/lodash/index.js',
      'node_modules/angular/angular.js',
      'node_modules/angular-mocks/angular-mocks.js',
      'lib/**/*.js',
      'test/**/*.spec.js'
    ]
  });
};
