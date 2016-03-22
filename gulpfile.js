var path = require('path'),
    gulp = require('gulp'),
    sass = require('gulp-sass'),
    // autoprefixer = require('gulp-autoprefixer'),
    minifycss = require('gulp-minify-css'),
    rename = require('gulp-rename'),
    babel = require("gulp-babel"),
    open = require('gulp-open'),
    tinylr;
gulp.task('express', function() {
    var express = require('express');
    var app = express();
    app.use(require('connect-livereload')({
        port: 35729
    }));
    app.use(express.static(path.join(__dirname, 'public')));
    app.listen(4000, '0.0.0.0');
});
gulp.task('livereload', function() {
    tinylr = require('tiny-lr')();
    tinylr.listen(35729);
});

function notifyLiveReload(event) {
    var fileName = require('path').relative(__dirname, event.path);
    tinylr.changed({
        body: {
            files: [fileName]
        }
    });
}
gulp.task('styles', function() {
    return gulp.src(['public/src/sass/**/*.scss', '!public/src/sass/**/_*.scss']).pipe(sass().on('error', sass.logError)).pipe(gulp.dest('public/dist/css/')).pipe(rename({
        suffix: '.min'
    })).pipe(minifycss()).pipe(gulp.dest('public/dist/css'));
});
gulp.task("scripts", function() {
	try {
	    
	    return gulp.src(["public/src/js/*.js", "!public/src/js/_*.js"]).pipe(babel({
	        presets: ['C:\\Users\\Sandeep\\AppData\\Roaming\\npm\\node_modules\\babel-preset-es2015',
	        'C:\\Users\\Sandeep\\AppData\\Roaming\\npm\\node_modules\\babel-preset-react']
	    })).pipe(gulp.dest("public/dist/js"));
	}
	catch(err) {
	    console.log(err.message);
	}
});
gulp.task('open', function() {
    var options = {
        uri: 'http://localhost:4000',
        // app: 'firefox'
    };
    gulp.src(__filename).pipe(open(options));
});
gulp.task('watch', function() {
    gulp.watch('public/src/sass/**/*.scss', ['styles']);
    gulp.watch('public/src/js/*.js', ['scripts']);
    gulp.watch('public/*.html', notifyLiveReload);
    gulp.watch('public/dist/js/*.js', notifyLiveReload);
    gulp.watch('public/dist/css/*.css', notifyLiveReload);
});
gulp.task('default', ['styles', 'scripts', 'express', 'livereload', 'open', 'watch'], function() {});