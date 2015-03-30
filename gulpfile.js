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

gulp.task('demo', function () {
    var plugin = require('./index');
    var processors = [plugin({basePath: 'demo/images', removeImage: true})];

    return gulp.src('demo/demo.css')
        .pipe( postcssAsync(processors) )
        .pipe( gulp.dest('./demo/compiled') );
});

gulp.task('default', ['lint', 'test']);
