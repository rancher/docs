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
import watch from 'gulp-watch';

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

gulp.task('build', (cb) => {
  runSequence('pub-delete', 'sass', 'build:vendor', 'build:app', 'fonts', 'img', 'hugo' , 'hugo-search-index', () => {
    cb();
  });
});

gulp.task('build-staging', (cb) => {
  runSequence('pub-delete', 'sass', 'build:vendor', 'build:app', 'fonts', 'img', 'hugo-staging' , 'hugo-search-index', () => {
    cb();
  });
});

gulp.task('build-dev', (cb) => {
  runSequence('pub-delete', 'sass', 'build:vendor', 'build:app', 'fonts', 'img', 'hugo-dev' , /* 'hugo-search-index', */ () => {
    cb();
  });
});

gulp.task('hugo', (cb) => {
  return spawn('hugo', ['--buildFuture', '--baseURL=/docs'], { stdio: 'inherit' }).on('close', (/* code */) => {
    browserSync.reload();
    cb();
  });
});

gulp.task('hugo-staging', (cb) => {
  return spawn('hugo', ['--buildDrafts', '--buildFuture', '--baseURL=/docs'], { stdio: 'inherit' }).on('close', (/* code */) => {
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
  watch([ 'src/sass/**/*.scss', 'node_modules/rancher-website-theme/**/*.scss' ], () => runSequence('sass', 'hugo-dev'));
  watch([ 'src/js/**/*.js', 'node_modules/rancher-website-theme/static/js/base.js' ], () => runSequence('build:app', 'hugo-dev'));
  watch('src/img/**/*', () => runSequence('img', 'hugo-dev'));
  watch(['archetypes/**/*', 'data/**/*', 'content/**/*', 'layouts/**/*', 'node_modules/rancher-website-theme/layouts/**/*', 'node_modules/rancher-website-theme/archetypes/**/*', 'node_modules/rancher-website-theme/data/**/*', 'node_modules/rancher-website-theme/content/**/*', 'themes/**/*', 'config.toml'], () => gulp.start('hugo-dev'));
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
    .pipe(gulp.dest('static/css'));
});

const vendors = ['zoom.ts', 'ml-stack-nav', 'lory.js', 'tingle.js', 'moment', 'jquery'];

gulp.task('build:vendor', () => {
  const b = browserify();

  // require all libs specified in vendors array
  vendors.forEach(lib => {
    b.require(lib);
  });

  return b.bundle()
    .pipe(source('vendor.js'))
    .pipe(buffer())
    .pipe(gulp.dest('static/js'));
});

gulp.task('build:app', () => {
  return browserify({
    entries: ['./node_modules/rancher-website-theme/static/js/base.js', './src/js/app.js'],
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

gulp.task('pub-delete', () => {
  return del(['public/**', '!public']);
});
