const gulp = require('gulp');
const gulpSass = require('gulp-sass');
const browserSync = require('browser-sync');

const reloadGlob = ['*.html', 'js/*.js', 'js/**/*.js'];
const streamGlob = ['scss/*.scss', 'scss/**/*.scss'];

gulp.task('start-browser-sync', () => {
    browserSync.init({
        open: true,
        browser: 'firefox',
        server: {
            baseDir: './'
        }
    });
});

gulp.task('reload-browser', () => {
    browserSync.reload();
});

gulp.task('stream2-browser', () => {
    gulp.src(streamGlob)
        .pipe(gulpSass({
            outputStyle: 'expanded'
        }))
        .on('error', cssError)
        .pipe(gulp.dest('css'))
        .pipe(browserSync.stream());
});

function cssError(err) {
    console.log(err.toString());
    this.emit('end');
}

gulp.task('watch', () => {
    gulp.watch(reloadGlob, ['reload-browser']);
    gulp.watch(streamGlob, ['stream2-browser']);
});

gulp.task('default', ['start-browser-sync', 'stream2-browser', 'watch']);
