var gulp = require('gulp');
var plumber = require('gulp-plumber');
var notify = require('gulp-notify');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var jasmine = require('gulp-jasmine');

var BUILD_DIR = 'dist/';

gulp.task('default', ['build']);

gulp.task('build', function() {
  return gulp.src('src/smoother.js')
    .pipe(plumber())
    .pipe(uglify())
    .pipe(rename({ extname: ".min.js" }))
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