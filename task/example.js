var gulp = require('gulp');
var rename = require('gulp-rename');
var serve = require('gulp-serve');
var browserify = require('browserify');
var sequence = require('run-sequence');

var through = require('through2');

var gulpBrowserify = function () {
  var plugin = function (file, encoding, callback) {
    var streamer = through();
    streamer.on('error', this.emit.bind(this, 'error'));

    file.contents = browserified(file.path).pipe(streamer);

    callback(null, file);
  };
  var browserified = function (filepath) {
    var b = browserify(filepath, {debug: false});
    return b.bundle();
  };
  return through.obj(plugin);
};

gulp.task('example-build', function () {
  return gulp.src([
      './example/main.js'
    ], {
      base: './example'
    })
    .pipe(gulpBrowserify())
    .pipe(rename({basename: 'bundle'}))
    .pipe(gulp.dest('example/'));
});

gulp.task('example-serve', serve('example'));

gulp.task('example', function () {
  return sequence('example-build', 'example-serve');
});
