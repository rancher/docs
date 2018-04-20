/* eslint:ignore */
'use strict';

import gulp from 'gulp';
import del from 'del';
import runSequence from 'run-sequence';
import gulpLoadPlugins from 'gulp-load-plugins';
import { spawn } from "child_process";
import tildeImporter from 'node-sass-tilde-importer';
import browserify from 'browserify';
import source from 'vinyl-source-stream';
import buffer from 'vinyl-buffer';
import babelify from 'babelify';

const $ = gulpLoadPlugins();
const browserSync = require('browser-sync').create();
const isProduction = process.env.NODE_ENV === 'production';

require('hugo-search-index/gulp')(gulp);

const onError = (err) => {
  console.log(err);
}

process.on('SIGINT', () => {
  console.log('Caught SIGINT, exiting');
  process.exit(0);
});

// --
gulp.task('dev', ['build-dev'], () => {
  gulp.start('init-watch');
});

gulp.task('build', () => {
  runSequence('pub-delete', ['sass', 'build:vendor', 'build:app', 'fonts', 'img'], 'hugo' /*, 'hugo-search-index'*/);
});

gulp.task('build-staging', () => {
  runSequence('pub-delete', ['sass', 'build:vendor', 'build:app', 'fonts', 'img'], 'hugo-staging' /*, 'hugo-search-index'*/);
});

gulp.task('build-dev', () => {
  runSequence('pub-delete', ['sass', 'build:vendor', 'build:app', 'fonts', 'img'], 'hugo-dev' /*, 'hugo-search-index'*/);
});

gulp.task('hugo', (cb) => {
  return spawn('hugo', ['--buildFuture'], { stdio: 'inherit' }).on('close', (/* code */) => {
    browserSync.reload();
    cb();
  });
});

gulp.task('hugo-staging', (cb) => {
  return spawn('hugo', ['--buildDrafts', '--buildFuture'], { stdio: 'inherit' }).on('close', (/* code */) => {
    browserSync.reload();
    cb();
  });
});

gulp.task('hugo-dev', (cb) => {
  return spawn('hugo', ['--buildDrafts', '--buildFuture', '--baseURL=http://localhost:9001'], { stdio: 'inherit' }).on('close', (/* code */) => {
    browserSync.reload();
    cb();
  });
});

gulp.task('init-watch', () => {
  browserSync.init({
    server: {
      baseDir: 'public'
    },
    port: 9001,
    open: false
  });
  $.watch('src/sass/**/*.scss', () => gulp.start('sass'));
  $.watch('node_modules/rancher-website-theme/**/*.scss', () => gulp.start('sass'));
  $.watch('src/js/**/*.js', () => gulp.start('js-watch'));
  $.watch('src/img/**/*', () => gulp.start('img'));
  $.watch(['archetypes/**/*', 'data/**/*', 'content/**/*', 'layouts/**/*', 'static/**/*', 'themes/**/*', 'node_modules/rancher-website-theme/**/*', 'config.toml'], () => gulp.start('hugo-dev'));
});


// --

gulp.task('sass', () => {
  return gulp.src([
    'src/sass/**/*.scss'
  ])
    .pipe($.plumber({ errorHandler: onError }))
    .pipe($.sassLint())
    .pipe($.sassLint.format())
    .pipe($.sass({ precision: 5, importer: tildeImporter }))
    .pipe($.autoprefixer(['ie >= 10', 'last 2 versions']))
    .pipe($.if(isProduction, $.cssnano({ discardUnused: false, minifyFontValues: false })))
    .pipe($.size({ gzip: true, showFiles: true }))
    .pipe(gulp.dest('static/css'))
    .pipe(browserSync.stream());
});

gulp.task('js-watch', ['js'], (cb) => {
  browserSync.reload();
  cb();
});

const vendors = ['ml-stack-nav', 'lory.js', 'tingle.js', 'moment', 'jquery'];

gulp.task('build:vendor', () => {
  const b = browserify();

  // require all libs specified in vendors array
  vendors.forEach(lib => {
    b.require(lib);
  });

  b.bundle()
    .pipe(source('vendor.js'))
    .pipe(buffer())
    .pipe(gulp.dest('static/js'));
});

gulp.task('build:app', () => {
  browserify({
    entries: ['./src/js/app.js'],
    extensions: ['.js',],
    debug: true,
    insertGlobals: true
  })
    .external(vendors) // Specify all vendors as external source
    .transform(babelify)
    .bundle()
    .pipe(source('app.js'))
    .pipe(buffer())
    .pipe(gulp.dest('static/js'));
});

gulp.task('js', () => {
  return gulp.src([
    'src/js/**/*.js'
  ])
    .pipe($.plumber({ errorHandler: onError }))
    .pipe($.babel())
    .pipe($.concat('app.js'))
    .pipe($.if(isProduction, $.uglify()))
    .pipe($.size({ gzip: true, showFiles: true }))
    .pipe(gulp.dest('static/js'));
});

gulp.task('fonts', () => {
  return gulp.src('src/fonts/**/*.{woff,woff2}')
    .pipe(gulp.dest('static/fonts'));
});

gulp.task('img', () => {
  return gulp.src('src/img/**/*.{png,jpg,jpeg,gif,svg,webp,ico}')
    .pipe(gulp.dest('static/img'));
});

gulp.task('minify-images', () => {
  return gulp.src('src/img/**/*.{png,jpg,jpeg,gif,svg,webp,ico}')
    .pipe($.newer('static/img'))
    .pipe($.imagemin())
    .pipe(gulp.dest('src/img'));
});

gulp.task('cms-delete', () => {
  return del(['static/admin'], { dot: true });
});

gulp.task('pub-delete', (cb) => {
  del(['public/**', '!public'], {
    // dryRun: true,
    dot: true
  }).then(paths => {
    console.log('Total Files Deleted: ' + paths.length + '\n');
    cb();
  });
});
