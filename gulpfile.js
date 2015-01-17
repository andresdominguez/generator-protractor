var gulp = require('gulp');
var mocha = require('gulp-mocha');

var files = [
  'app/**/*.js',
  'unit/**/*.js',
  'test/**/*.js'
];

gulp.task('default', ['test']);

gulp.task('test', function() {
  return gulp.src('test/**/*.js', {read: false})
      .pipe(mocha());
});

gulp.task('watch', function() {
  var watcher = gulp.watch(files, ['test']);
  watcher.on('change', function(event) {
    console.log('File ' + event.path + ' was ' + event.type + ', running tasks...');
  });
});
