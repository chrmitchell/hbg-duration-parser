/* jshint node:true */
'use strict';

var gulp = require('gulp');
var watch = require('gulp-watch');
var babel = require('gulp-babel');
var uglify = require('gulp-uglify');

gulp.task('babel', () => {
    return gulp.src('src/durationParser.js')
        .pipe(babel({presets: ['es2015']}))
        .pipe(uglify())
        .pipe(gulp.dest('dist'));
});

gulp.task('watch', function () {
    gulp.watch('src/durationParser.js', ['babel']);
});

gulp.task('default', ['babel','watch']);
