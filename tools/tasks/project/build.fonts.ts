import {FONTS_DEPENDENCIES, FONTS_DEST} from '../../config';
import * as gulp from 'gulp';

export = () => {
  return gulp.src(FONTS_DEPENDENCIES)
    .pipe(gulp.dest(FONTS_DEST));
};
