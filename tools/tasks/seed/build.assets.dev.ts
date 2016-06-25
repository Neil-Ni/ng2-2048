import * as gulp from 'gulp';
import {join} from 'path';
import {APP_SRC, APP_DEST} from '../../config';

export = () => {
  return gulp.src([
      join(APP_SRC, '**'),
      '!' + join(APP_SRC, '**', '*.ts'),
      '!' + join(APP_SRC, '**', '*.scss')
    ])
    .pipe(gulp.dest(APP_DEST));
};
