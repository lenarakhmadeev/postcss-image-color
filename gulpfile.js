var gulp = require('gulp');
var postcssAsync = require('./gulp-postcss-async');

gulp.task('lint', function () {
    var jshint = require('gulp-jshint');
    return gulp.src(['index.js', 'test/*.js', 'gulpfile.js'])
        .pipe(jshint())
        .pipe(jshint.reporter('jshint-stylish'))
        .pipe(jshint.reporter('fail'));
});

gulp.task('test', function () {
    var mocha = require('gulp-mocha');
    return gulp.src('test/*.js', { read: false }).pipe(mocha());
});

gulp.task('async', function () {
    var processerer = function (message, timeout) {
        return function (css) {
            return new Promise(function (resolve) {
                setTimeout(function () {
                    console.log(message);
                    resolve(css);
                }, timeout);
            });
        };
    };

    var processors = [
        processerer('1m', 4000),
        processerer('2m', 2000),
        processerer('3m', 3000)
    ];

    return gulp.src('test/fixtures/1.css')
        .pipe( postcssAsync(processors) );
});

gulp.task('default', ['lint', 'test']);
