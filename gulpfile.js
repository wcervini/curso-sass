"use strict";

// Load plugins
const autoprefixer = require("autoprefixer");
const { stream } = require("browser-sync");
const browsersync = require("browser-sync").create();
const cp = require("child_process");
const cssnano = require("cssnano");
const del = require("del");
const gulp = require("gulp");
const imagemin = require("gulp-imagemin");
const newer = require("gulp-newer");
const plumber = require("gulp-plumber");
const postcss = require("gulp-postcss");
const rename = require("gulp-rename");
const sass = require("gulp-sass");
const {series,parallel, src,dest} = require("gulp");





function css() {
  return gulp.src("./src/scss/**/*.scss")
    .pipe(plumber())
    .pipe(sass({ outputStyle: "expanded" }))
    .pipe(rename({ suffix: ".min" }))
    .pipe(postcss([autoprefixer(), cssnano()]))
    .pipe(gulp.dest("./src/css"))
    .pipe(browsersync.stream());
}

// Watch files
function watchFiles() {
  gulp.watch("./src/scss/**/*.scss",css).on("change",browsersync.reload);
  gulp.watch(["./index.html","./src/css/style.min.css"]).on("change",browsersync.reload); 
}

function concacss() {
  return src([
    "./src/css/style.css",
    "./bower_components/normalize.css/normalize.css",
  ])
    .pipe(sourcemaps.init())
    .pipe(concatCss("bundle.css"))
    .pipe(cleanCSS({ compatibility: "ie8" }))
    .pipe(sourcemaps.write())
    .pipe(dest("./dist/css"))
    .pipe(browsersync.stream());
}


// Clean assets
function clean() {
  return del(["./src/css"]);
}

// BrowserSync
function BrowserSync(done) {
  browsersync.init({
    server: "./"
  });
  done();
}

const watch = gulp.parallel(watchFiles, BrowserSync);

exports.css = css;
exports.watch = watch;
exports.clean = clean;
