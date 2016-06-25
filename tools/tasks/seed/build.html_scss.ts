import * as gulp from 'gulp';
import * as gulpLoadPlugins from 'gulp-load-plugins';
import * as merge from 'merge-stream';
import * as autoprefixer from 'autoprefixer';
import * as sass from 'gulp-sass';
import {join} from 'path';
import {APP_SRC, TMP_DIR, CSS_PROD_BUNDLE, CSS_DEST, APP_DEST, BROWSER_LIST, ENV, DEPENDENCIES} from '../../config';
const plugins = <any>gulpLoadPlugins();

const processors = [
  autoprefixer({
    browsers: BROWSER_LIST
  })
];

const isProd = ENV === 'prod';


function prepareTemplates() {
  return gulp.src(join(APP_SRC, '**', '*.html'))
    .pipe(gulp.dest(TMP_DIR));
}

function processComponentCss() {
  return gulp.src([join(APP_SRC, '**', '*.scss')])
    .pipe(isProd ? plugins.cached('process-component-scss') : plugins.util.noop())
    .pipe(plugins.sass())
    .pipe(gulp.dest(APP_DEST));
}

export = () => merge(processComponentCss(), prepareTemplates());
