/**
 * Created by jovi on 11/29/15.
 */
import fs from 'fs';
import through from 'through2';
import crypto from 'crypto';
import path from 'path';
import glob from 'glob';
import gutil from 'gulp-util';

import gulp from 'gulp';
import sourceMaps from 'gulp-sourcemaps';
import template from 'gulp-template';
import concat from 'gulp-concat';
import uglify from 'gulp-uglify';
import liveReload from 'gulp-livereload';
import args from 'yargs';

import sass from 'gulp-sass';
import autoPrefixer from 'gulp-autoprefixer';
import cssMinify from 'gulp-minify-css';

import babel from 'gulp-babel';
import browserify from 'browserify';
import debowerify from 'debowerify';
import bowerResolve from 'bower-resolve';
import source from 'vinyl-source-stream';
import buffer from 'vinyl-buffer';
import browserifyShim from 'browserify-shim';
import babelify from 'babelify';
import replace from 'gulp-replace';
import rename from 'gulp-rename';
import webserver from 'gulp-webserver';
import ngAnnotate from 'gulp-ng-annotate';

const argv = args.argv;
console.log(argv);

const libs = Object.keys(require('./package.json').dependencies).filter(lib=> true);

function calcMd5(file, slice) {
    let md5 = crypto.createHash('md5');
    md5.update(file.contents, 'utf8');

    return slice > 0 ? md5.digest('hex').slice(0, slice) : md5.digest('hex');
}

function md5(size, html, debug = false) {

    return through.obj(function(file, enc, cb) {

        if (!debug) {

            const ofilename = path.basename(file.path);
            let [fPrefix, fExtension] = ofilename.split('.');
            const d = calcMd5(file, size);

            const newFilename = fPrefix + '_' + d + '.' + fExtension;

            file.path = path.join(file.base, newFilename);
            const pattern = new RegExp(fPrefix + '(_\\w\{' + size + '\})?\\.' + fExtension, 'g');

            const folder = './dest';
            fs.readdirSync(folder)
                .forEach(f=>pattern.test(f) ? fs.unlink(folder + '/' + f) : '');

            let data = fs.readFileSync(html, 'utf-8').replace(pattern, newFilename);

            fs.writeFileSync(html, data, 'utf-8');
        }

        this.push(file);

        cb();

    }, function(cb) {
        cb();
    });
}

gulp.task('app_js', ()=> {

    const html = __dirname + '/index.html';

    browserify({
        entries: './src/app/index.js',
        debug: true
    })
        .external(libs)
        .transform(babelify)
        .bundle()
        .on('error', function(error) {
            console.error(`error at ${JSON.stringify(error.loc)} of ${error.filename}`);
            console.error(error);
            return true;
        })
        .pipe(source('app.js'))
        .pipe(ngAnnotate({
            remove: true,
            add: true,
            single_quotes: true
        }))
        .pipe(buffer())
        .pipe(sourceMaps.init({loadMaps: true}))
        //.pipe(uglify())
        //.pipe(md5(10, html, argv.debug))
        .pipe(sourceMaps.write('.'))
        .pipe(gulp.dest('./dest'))
        .pipe(liveReload());
});

gulp.task('app_css', ()=> {

    const html = './index.html';
    const cssPath = './dest';

    gulp.src(['./src/scss/*.scss'])
        .pipe(sourceMaps.init())
        .pipe(concat('app.css'))
        .pipe(sass.sync({includePaths: ['./src/scss/'], outputStyle: 'compressed'}).on('error', sass.logError))
        .pipe(autoPrefixer({browsers: ['> 1%', 'IE 7'], cascade: false}))
        //.pipe(md5(10, html, argv.debug))
        .pipe(sourceMaps.write('.'))
        .pipe(gulp.dest(cssPath))
        .pipe(liveReload());
});

gulp.task('html', ()=> {
    gulp.src(['./partials/*.*', './index.html', './login.html'])
        .pipe(gulp.dest('./dest'))
        .pipe(liveReload());
});

gulp.task('vendor_js', ()=> {

    const html = './index.html';

    const jsPath = './dest';

    const b = browserify({
        ignoreGlobals: true,
        debug: false
    })
        .require(libs)
        .transform(debowerify)
        .bundle()
        .pipe(source('vendor.js'))
        .pipe(buffer())
        //.pipe(uglify())
        //.pipe(md5(10, html, args.debug))
        .pipe(gulp.dest(jsPath));

});

gulp.task('watch', () => {
    liveReload.listen();
    argv.debug = true;
    gulp.watch(__dirname + 'package.json', ['vendor_js']);
    gulp.watch(__dirname + '/src/app/**/*.js', ['app_js']);
    gulp.watch(__dirname + '/src/scss/**/*.scss', ['app_css']);
    gulp.watch([__dirname + '/partials/**/*.html', './index.html'], ['html']);
});

gulp.task('webserver', ()=> {
    gulp.src('./dest')
        .pipe(webserver({
            fallback: 'index.html',
            port: 9001
        }));
});

gulp.task('app', ['app_js', 'app_css', 'html']);
gulp.task('vendor', ['vendor_js']);

if (argv.debug) {
    gulp.task('default', ['vendor', 'app', 'watch']);
} else {
    gulp.task('default', ['vendor', 'app']);
}
