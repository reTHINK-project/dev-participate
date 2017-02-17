var gulp        = require('gulp');
var browserSync = require('browser-sync').create();
var browserify = require('browserify')
var babelify = require('babelify')
var sourcemaps = require('gulp-sourcemaps')
var source = require('vinyl-source-stream')
var buffer = require('vinyl-buffer')
var rename = require('gulp-rename')

gulp.task('js', function () {
    return browserify('app/main.js')
        .transform(babelify, {})
        .bundle()
        .pipe(source('main.js'))
        .pipe(buffer())
        .pipe(rename('bundle.js'))
        .pipe(gulp.dest('js'));
});

gulp.task('js-watch', ['js'], function (done) {
    browserSync.reload();
    done();
});

gulp.task('serve', ['js'], function() {
    browserSync.init({
        server: {
            baseDir: "./",
            https: true
        }
    });

    gulp.watch("app/**/*.js", ['js-watch']);
});
