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


// gulp.task('browserify', function () {
    
//     var entryFile = 'src/durationParser.js';

//     var bundler = watchify(browserify({
//         entries: entryFile,
//         debug: true,
//         transform: [babelify]
//     }));

//     var rebundle = function () {
//     	console.log('rebundling');
//         return bundler.bundle().
//             on('error', function (err) { console.error(err); })
//             .pipe(source('./durationParser.js'))
//             // .pipe(uglify())
//             .pipe(gulp.dest('dist'));
//     };
//     bundler.on('update', rebundle);
//     return rebundle();
// });

// gulp.task('default', ['browserify']);