var gulp = require('gulp'),
    uglify = require('gulp-uglify'),
    concat = require('gulp-concat');

gulp.task('default', function() {
    gulp.src(['src/services/*.js', 'src/interactables/*.js', 'src/app.js'])
        .pipe(uglify())
        .pipe(concat('app.js'))
        .pipe(gulp.dest('dist'));

    gulp.src(['src/style.css', 'manifest.json'])
        .pipe(gulp.dest('dist'));
});