var gulp = require('gulp');
var ghPages = require('gulp-gh-pages');
gulp.task('ghPage', function() {
  return gulp.src('./docs/**/*.*')
    .pipe(ghPages());
***REMOVED***);
