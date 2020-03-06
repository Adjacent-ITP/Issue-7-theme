/**
 * requirements
 */

/** basic **/
var gulp = require("gulp");
var runSequence = require("run-sequence");
var env = require("gulp-env");
var browserSync = require("browser-sync");

/** sass **/
var sass = require("gulp-sass");
var autoprefixer = require("autoprefixer");
var lost = require("lost");
var inject = require("gulp-inject");
var foreach = require("gulp-foreach");
var sort = require("gulp-sort");

/** utils **/
var sourcemaps = require("gulp-sourcemaps");
var changed = require("gulp-changed");
var plumber = require("gulp-plumber");
var gutil = require("gulp-util");
var cssnano = require("gulp-cssnano");
var concat = require("gulp-concat");
var uglify = require("gulp-uglify");
var rename = require("gulp-rename");
var del = require("del");

/*
 * settings
 */

var reload = browserSync.reload;

var onError = function(error) {
  gutil.beep();
  gutil.log(gutil.colors.red("Error [" + error.plugin + "]: " + error.message));
  this.emit("end");
};

var basePath = {
  src: "src/",
  dest: "public/",
  root: ""
};

var src = {
  img: basePath.src + "img/",
  js: basePath.src + "js/",
  css: basePath.src + "styles/"
};

var dest = {
  img: basePath.dest + "img/",
  js: basePath.dest + "js/",
  css: basePath.root
  // css: basePath.dest + 'css/',
};

env({
  file: ".env.json"
});

/*
 * sub tasks
 */

gulp.task("browser-sync", function() {
  browserSync.init({
    port: process.env.PORT,
    notify: false,
    open: false,
    server: {
      baseDir: basePath.dest
    }
  });

  gulp.watch(src.js + "**/*.js", ["make:js"]);
  gulp.watch(src.css + "**/*.scss", ["make:css"]);
});

gulp.task("make:js", function() {
  return gulp
    .src([src.js + "vendor/*.js", src.js + "main.js", src.js + "modules/*.js"])
    .pipe(
      plumber({
        errorHandler: onError
      })
    )
    .pipe(sourcemaps.init())
    .pipe(sourcemaps.write())
    .pipe(concat("main.js"))
    .pipe(gulp.dest(dest.js))
    .pipe(browserSync.stream());
});

gulp.task("make:import", function() {
  return gulp.src(src.css + "_*.scss").pipe(
    foreach(function(stream, file) {
      var text = file.relative.replace(/^_(.+)\.scss$/, "$1");
      return stream
        .pipe(
          inject(gulp.src(src.css + text + "/**/_*.scss").pipe(sort()), {
            relative: true,
            starttag: "/* inject:scss */",
            endtag: "/* endinject */",
            transform: function(filepath, file) {
              return '@import "' + filepath + '";';
            }
          })
        )
        .pipe(gulp.dest(src.css));
    })
  );
});

gulp.task("make:css", function() {
  var plugins = [autoprefixer({ browsers: ["last 2 versions"] }), lost];
  return gulp
    .src(src.css + "*.scss")
    .pipe(
      plumber({
        errorHandler: onError
      })
    )
    .pipe(changed(src.css + "**/*.scss"))
    .pipe(sourcemaps.init())
    .pipe(sass().on("error", sass.logError))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest(dest.css))
    .pipe(browserSync.stream());
});

gulp.task("minify", ["make:css", "make:js"], function() {
  gulp
    .src(dest.css + "*.css")
    .pipe(cssnano())
    .pipe(gulp.dest(dest.css));
});

/*
 * main tasks
 */

gulp.task("build", function() {
  runSequence("make:css", "make:js", "minify");
});

gulp.task("default", ["browser-sync", "make:css", "make:js"]);
