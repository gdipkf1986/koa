import gulp from 'gulp'
import babel from 'gulp-babel'
import rename from 'gulp-rename'
import concat from 'gulp-concat'
import browserify from 'browserify';
import source from 'vinyl-source-stream';
import babelify from 'babelify';

gulp.task('transformer', function () {

    return browserify({
        entries: './scripts/app.js',
        debug: true
    })
        .transform(babelify)
        .bundle()
        .pipe(source('app.js'))
        .pipe(gulp.dest('./scripts/dest'))
});

gulp.task('default', function () {
    gulp.run('transformer');
    gulp.watch(['./scripts/*.js'], ['transformer']);
});

