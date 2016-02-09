var gulp = require("gulp");
var gutil = require("gulp-util");
var webpack = require("webpack");
var webpackConfig = require("./webpack.production.config.js");
var del = require('del');
var uglify = require('gulp-uglify');

gulp.task('compress', function() {
  return gulp.src('www/js/app.bundle.js')
    .pipe(uglify({mangle:false}))
    .pipe(gulp.dest('www/js'));
});
gulp.task('clean', function () {
  return del([
    'www/**/*.*'
  ]);
});

gulp.task('copy', ['clean'], function(){
  // the base option sets the relative root for the set of files,
  // preserving the folder structure
  gulp.src(['**/*.html', '**/*.json'], { base: './app' })
  .pipe(gulp.dest('www'));
});

gulp.task("build",  ['copy']);