var gulp = require('gulp');
var ghPages = require('gulp-gh-pages');
gulp.task('pissOffJekyll', function () {
gulp.src('./.nojekyll').pipe(gulp.dest('./docs'));
***REMOVED***)
gulp.task('ghPage', ['pissOffJekyll'],function() {
  return gulp.src('./docs/**/*.*')
    .pipe(ghPages());
***REMOVED***);
