var gulp = require('gulp');
var sass = require('gulp-sass'),  livereload = require('gulp-livereload');

gulp.task('styles', function() {
    gulp.src('public/src/sass/**/*.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest('public/dist/css/'))
        .pipe(livereload())
});

//Watch task
gulp.task('default',function() {
	livereload.listen();
    gulp.watch('public/src/sass/**/*.scss',['styles']);
});