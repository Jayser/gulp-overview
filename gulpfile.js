var gulp = require('gulp');
var concat = require('gulp-concat');
var clean = require('gulp-clean');

console.log('NODE_ENV:', process.env.NODE_ENV);

var paths = {
    index: 'app/index.html',
    builds: 'builds',
    buildJs: 'builds/js',
    scripts: ['app/js/**/*.js']
};

gulp.task('clean-scripts', function () {
    return gulp.src(paths.buildJs, {read: false})
        .pipe(clean({force: true}));
});

gulp.task('copy-index-html', function () {
    gulp.src(paths.index)
        .pipe(gulp.dest(paths.builds));
});

gulp.task('scripts', ['clean-scripts'], function () {
    return gulp.src(paths.scripts)
        .pipe(concat('main.js'))
        .pipe(gulp.dest(paths.buildJs));
});

// Rerun the task when a file changes
gulp.task('watch', function () {
    gulp.watch(paths.index, ['copy-index-html']);
    gulp.watch(paths.scripts, ['scripts']);
});

// The default task (called when you run `gulp` from cli)
gulp.task('default', ['copy-index-html', 'scripts', 'watch']);





