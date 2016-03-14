/******************************************************************************
 * Gulpfile
 * Be sure to run `npm install` for `gulp` and the following tasks to be
 * available from the command line. All tasks are run using `gulp taskName`.
 ******************************************************************************/
var gulp = require('gulp'),
    webpack = require('webpack'),
    sass = require('gulp-sass'),
    autoprefixer = require('gulp-autoprefixer'),
    watch = require('gulp-watch'),
    del = require('del');


var IONIC_DIR = "node_modules/ionic-angular/"


/******************************************************************************
 * watch
 * Build the app and watch for source file changes.
 ******************************************************************************/
gulp.task('watch', ['sass', 'copy.fonts', 'copy.html', 'copy.json', 'copy.images'], function(done) {
  watch('www/app/**/*.scss', function(){
    gulp.start('sass');
***REMOVED***);
  watch('www/app/**/*.html', function(){
    gulp.start('copy.html');
***REMOVED***);
  watch('www/app/**/*.json', function(){
    gulp.start('copy.json');
***REMOVED***);
  watch('www/app/**/*.+(png|jpg|svg|gif|jpeg)', function(){
    gulp.start('copy.images');
***REMOVED***);
  bundle(true, done);
***REMOVED***);


/******************************************************************************
 * build
 * Build the app once, without watching for source file changes.
 ******************************************************************************/
gulp.task('build', ['sass', 'copy.fonts', 'copy.html', 'copy.json', 'copy.images'], function(done) {
  bundle(false, done);
***REMOVED***);


/******************************************************************************
 * sass
 * Convert Sass files to a single bundled CSS file. Uses auto-prefixer
 * to automatically add required vendor prefixes when needed.
 ******************************************************************************/
gulp.task('sass', function(){
  var autoprefixerOpts = {
    browsers: [
      'last 2 versions',
      'iOS >= 7',
      'Android >= 4',
      'Explorer >= 10',
      'ExplorerMobile >= 11'
    ],
    cascade: false
***REMOVED***;

  return gulp.src('app/theme/app.+(ios|md).scss')
    .pipe(sass({
      includePaths: [
        IONIC_DIR,
        'node_modules/ionicons/dist/scss'
      ]
  ***REMOVED***))
    .on('error', function(err){
      console.error(err.message);
      this.emit('end');
  ***REMOVED***)
    .pipe(autoprefixer(autoprefixerOpts))
    .pipe(gulp.dest('www/build/css'))
***REMOVED***);


/******************************************************************************
 * copy.fonts
 * Copy Ionic font files to build directory.
 ******************************************************************************/
gulp.task('copy.fonts', function() {
  return gulp.src(IONIC_DIR + 'fonts/**/*.+(ttf|woff|woff2)')
    .pipe(gulp.dest('www/build/fonts'));
***REMOVED***);

/******************************************************************************
 * copy.images
 * Copy copy images files to build directory.
 ******************************************************************************/
gulp.task('copy.images', function() {
  return gulp.src('app/**/*.+(png|jpg|svg|gif|jpeg)')
    .pipe(gulp.dest('www/build'));
***REMOVED***);

/******************************************************************************
 * copy.html
 * Copy html files to build directory.
 ******************************************************************************/
gulp.task('copy.html', function(){
  return gulp.src('app/**/*.html')
    .pipe(gulp.dest('www/build'));
***REMOVED***);

/******************************************************************************
 * copy.json
 * Copy json files to build directory.
 ******************************************************************************/
gulp.task('copy.json', function(){
  return gulp.src('app/**/*.json')
    .pipe(gulp.dest('www/build'));
***REMOVED***);


/******************************************************************************
 * clean
 * Delete previous build files.
 ******************************************************************************/
gulp.task('clean', function(done) {
  del(['www/build'], done);
***REMOVED***);


/******************************************************************************
 * Bundle
 * Transpiles source files and bundles them into build directory using webpack.
 ******************************************************************************/
function bundle(watch, cb) {
  // prevent gulp calling done callback more than once when watching
  var firstTime = true;

  // load webpack config
  var config = require('./webpack.config.js');

  // https://github.com/webpack/docs/wiki/node.js-api#statstojsonoptions
  var statsOptions = {
    'colors': true,
    'modules': false,
    'chunks': false,
    'exclude': ['node_modules']
***REMOVED***

  var compiler = webpack(config);
  if (watch) {
    compiler.watch(null, compileHandler);
***REMOVED*** else {
    compiler.run(compileHandler);
***REMOVED***

  function compileHandler(err, stats){
    if (firstTime) {
      firstTime = false;
      cb();
  ***REMOVED***

    // print build stats and errors
    console.log(stats.toString(statsOptions));
***REMOVED***
***REMOVED***
