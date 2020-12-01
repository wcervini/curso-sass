'use strict';
 
var gulp = require('gulp');
var sass = require('gulp-sass');
var concatCss = require('gulp-concat-css');
var watch = require('gulp-watch');
var sourcemaps = require('gulp-sourcemaps');
const cleanCSS = require('gulp-clean-css');
const { series } = require('gulp');
 
sass.compiler = require('node-sass');
 
gulp.task('sass', function () {
  return gulp.src('./src/scss/**/*.scss')
    .pipe(sourcemaps.init({largeFile: true}))
    .pipe(sass().on('error', sass.logError))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('./src/css'));
});
 
gulp.task('watch', function () {
  return gulp.watch('./src/scss/**/*.scss', series(['sass',"concacss"]));
});


gulp.task('concacss', function () {
  return gulp.src([
    './src/css/style.css',
    "./bower_components/normalize.css/normalize.css"
  ])
    .pipe(sourcemaps.init())
    .pipe(concatCss("bundle.css"))
    .pipe(cleanCSS({compatibility: 'ie8'}))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('./dist/css'));
});