const gulp = require('gulp');
const sass = require('gulp-sass');
const del = require('del');
const nodemon = require('gulp-nodemon');

gulp.task('server', (cb) => {
    let started = false;
    return nodemon({
        script: 'start.js',
        ext: 'js, pug',
        ignore: ['node_modules/', 'public/']
    }).on('start', () => {
        if(!started) {
            cb();
            started = true;
        }
    })
});

gulp.task('styles', (cb) => {
    return gulp.src('sass/main.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest('./public/css')), cb();
});

gulp.task('watch', (cb) => {
    return gulp.watch('sass/**/*.scss', gulp.series('styles')), cb();
});

gulp.task('clean', (cb) => {
    return del([
        'css/main.css',
    ]), cb();
});

gulp.task('default', gulp.parallel('clean', 'watch', 'server'));
