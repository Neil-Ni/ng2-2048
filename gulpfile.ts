import * as gulp from 'gulp';
import * as runSequence from 'run-sequence';
import {loadTasks} from './tools/utils';
import {SEED_TASKS_DIR} from './tools/config';

loadTasks(SEED_TASKS_DIR);

gulp.task('build.dev', (done: any) =>
  runSequence('build.assets.dev',
              'build.html_scss',
              'build.js.dev',
              'build.index.dev',
              done));

gulp.task('build.dev.watch', (done: any) =>
  runSequence('build.dev',
              'watch.dev',
              done));

gulp.task('build.prod', (done: any) =>
  runSequence('clean.prod',
              'build.assets.prod',
              'build.html_scss',
              'copy.js.prod',
              'build.js.prod',
              'build.bundles',
              'build.bundles.app',
              'build.index.prod',
              done));

gulp.task('serve.dev', (done: any) =>
  runSequence('build.dev',
              'server.start',
              'watch.dev',
              done));

gulp.task('serve.prod', (done: any) => runSequence('build.prod', 'server.prod', done));
