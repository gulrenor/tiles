//Gulpfile.js

// Common
var gulp = require('gulp');
var rename = require('gulp-rename');
var plumber = require('gulp-plumber');
var pump = require('pump');
var livereload = require('gulp-livereload');

// S/CSS
var sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');
var cssnano = require('gulp-cssnano');

// JS
var uglify = require('gulp-uglify');
var concat = require('gulp-concat');

// Pug
var pug = require('gulp-pug');

// Locations
var dirSass_In = 'src/sass/**/*.*css';
var dirCSS_Out = 'www/css/';
var dirJS_In = 'src/js/**/*.js';
var dirJS_Out = 'www/js/';
var dirPug_In = 'src/pug/**/!(_)*.pug'; // Prevents _includes
var dirHTML_Out = 'www/';

// S/CSS task
gulp.task('styles', function() {
  gulp.src(dirSass_In)
    .pipe(plumber())
    .pipe(sass().on('error', sass.logError))
    .pipe(autoprefixer('last 2 versions', 'safari >=8', 'ie >= 10', 'opera 12.1', 'ios 6', 'android 4'))
    .pipe(gulp.dest(dirCSS_Out))
    .pipe(rename({
      suffix: '.min'
    }))
    .pipe(cssnano())
    .pipe(gulp.dest(dirCSS_Out));
});

// JS
gulp.task('scripts', function(cb) {
  pump([
    gulp.src(dirJS_In),
    concat('scripts.js'),
    gulp.dest(dirJS_Out),
    rename({
      suffix: '.min'
    }),
    uglify(),
    gulp.dest(dirJS_Out)
  ], cb);
});

// Pug task
gulp.task('html', function() {
  gulp.src(dirPug_In)
    .pipe(plumber())
    .pipe(pug({
      pretty: true
    }))
    .pipe(gulp.dest(dirHTML_Out));
})

// Watch
gulp.task('default', function() {
  livereload.listen();
  gulp.watch(dirSass_In, ['styles']);
  gulp.watch(dirJS_In, ['scripts']);
  gulp.watch(dirPug_In, ['html']);
});
