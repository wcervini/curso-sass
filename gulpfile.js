'use strict';

var gulp = require("gulp");
var {src,dest} = require('gulp');
var sass = require('gulp-sass');
var concatCss = require('gulp-concat-css');
var watch = require('gulp-watch');
var sourcemaps = require('gulp-sourcemaps');
const cleanCSS = require('gulp-clean-css');
const { series } = require('gulp');
const browserSync = require("browser-sync").create();
 sass.compiler = require('node-sass');
 
gulp.task('sass', function () {
  return src('./src/scss/**/*.scss')
    .pipe(sourcemaps.init())
    .pipe(sass().on('error', sass.logError))
    .pipe(cleanCSS({compatibility: 'ie8'}))
    .pipe(sourcemaps.write())
    .pipe(dest('./src/css'))
    .pipe(browserSync.stream());
});
 
gulp.task('watchs', function () {
  return gulp.watch('./src/scss/**/*.scss', series(['sass',"concacss"]));
});

gulp.task('concacss', function () {
  return src([
    './src/css/style.css',
    "./bower_components/normalize.css/normalize.css"
  ])
    .pipe(sourcemaps.init())
    .pipe(concatCss("bundle.css"))
    .pipe(cleanCSS({compatibility: 'ie8'}))
    .pipe(sourcemaps.write())
    .pipe(dest('./dist/css'))
    .pipe(browserSync.stream());
});

gulp.task('browser',series(['sass']),function() {
    browserSync.init({
      server: "./",
    });
    gulp.watch('./src/scss/style.scss',series([sass]));
    // gulp.watch('./src/scss/style.scss', series(['concacss']));
    // gulp.watch('./dist/css/bundle.css', series(['sass','concacss']));
    gulp.watch('./index.html').on('change',browserSync.reload);
});

