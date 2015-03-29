var gulp = require('gulp');

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


gulp.task('background', function (cb) {
    var plugin = require('./index');
    var fs = require("fs");
    var css = fs.readFileSync("./demo/demo.css", "utf8");
    var postcss = require('postcss');

    postcss(plugin).process(css).then(function (processed) {
        fs.writeFile("./demo/demo-compiled.css", processed.css);
        cb();
    })
});


gulp.task('demo', function (cb) {
    var plugin = require('./index');
    var postcss = require('gulp-postcss');

    postcss([plugin]).then(cb)
});

gulp.task('default', ['lint', 'test']);
