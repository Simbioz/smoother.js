var gulp = require('gulp');
var plumber = require('gulp-plumber');
var notify = require('gulp-notify');
var jasmine = require('gulp-jasmine');
var webpack = require('webpack-stream');

var BUILD_DIR = 'dist/';

gulp.task('default', ['build']);

gulp.task('build', function() {
  var webpackConfig = require('./webpack.config.js');
  return gulp.src('src/smoother.js')
    .pipe(plumber())
    .pipe(webpack(webpackConfig))
    .pipe(gulp.dest(BUILD_DIR));
});

gulp.task('test', ['build'], function () {
  return gulp.src('spec/**/*.js')
    .pipe(jasmine())
    .on('error', notify.onError({
      title: 'Test(s) Failed',
      message: 'One or more test(s) failed. See the CLI for details.'
    }));
});