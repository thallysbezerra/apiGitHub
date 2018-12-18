const gulp = require('gulp')
const sass = require('gulp-sass')
const concat = require('gulp-concat')

gulp.task('default', function(done) {
    gulp.src('public/css/global.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(concat('global.css'))
        .pipe(gulp.dest('public/css'))
        done()
});