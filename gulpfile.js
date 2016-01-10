'use strict';
var gulp = require('gulp');
var jshint = require('gulp-jshint');
var Server = require('karma').Server;

gulp.task('lint', function () {
  return gulp.src(['src/*.js', 'test/*.js'])
    .pipe(jshint())
    .pipe(jshint.reporter('default'));
});

/**
 * Run test once and exit
 */
gulp.task('test', function (done) {
  new Server({
    configFile: __dirname + '/karma.conf.js',
    singleRun: true
  }, done).start();
});

/**
 * Watch for file changes and re-run tests on each change
 */
gulp.task('tdd', function (done) {
  new Server({
    configFile: __dirname + '/karma.conf.js'
  }, done).start();
});

gulp.task('default', ['lint', 'test']);
