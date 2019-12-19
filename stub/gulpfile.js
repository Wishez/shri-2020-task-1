var gulp = require('gulp');
var sass = require('gulp-sass');
var babel = require('gulp-babel');
var uglify = require('gulp-uglify');
var cleanCSS = require('gulp-clean-css');
var del = require('del');
 
var paths = {
  styles: {
    src: 'styles/style.scss',
    watch: 'styles/**/*.scss',
    dest: 'build/'
  },
  scripts: {
    src: 'scripts/script.js',
    watch: 'scripts/**/*.js',
    dest: 'build/'
  }
};
 
function clean() {
  return del([ 'build' ]);
}
 
/*
 * Define our tasks using plain functions
 */
function styles() {
  return gulp.src(paths.styles.src)
    .pipe(sass().on('error', sass.logError))
    .pipe(cleanCSS())
    .pipe(gulp.dest(paths.styles.dest));
}
 
function scripts() {
  return gulp.src(paths.scripts.src, { sourcemaps: true })
    .pipe(babel())
    .pipe(uglify())
    .pipe(gulp.dest(paths.scripts.dest))
}
 
function watch() {
  gulp.watch(paths.scripts.watch, scripts);
  gulp.watch(paths.styles.watch, styles);
}
 
var build = gulp.series(clean, gulp.parallel(styles, scripts));
 
exports.clean = clean;
exports.styles = styles;
exports.scripts = scripts;
exports.watch = watch;
exports.build = build;

exports.default = build;