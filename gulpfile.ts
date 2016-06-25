import * as gulp from 'gulp';
import * as runSequence from 'run-sequence';
import {loadTasks} from './tools/utils';
import {SEED_TASKS_DIR, PROJECT_TASKS_DIR} from './tools/config';

loadTasks(SEED_TASKS_DIR);
loadTasks(PROJECT_TASKS_DIR);


// --------------
// Build dev.
gulp.task('build.dev', (done: any) =>
  runSequence('build.assets.dev',
              'build.fonts',
              'build.html_scss',
              'build.js.dev',
              'build.index.dev',
              done));

// --------------
// Build dev watch.
gulp.task('build.dev.watch', (done: any) =>
  runSequence('build.dev',
              'watch.dev',
              done));

// --------------
// Build prod.
gulp.task('build.prod', (done: any) =>
  runSequence('clean.prod',
              'build.assets.prod',
              'build.fonts',
              'build.html_scss',
              'copy.js.prod',
              'build.js.prod',
              'build.bundles',
              'build.bundles.app',
              'build.index.prod',
              done));

// --------------
// Serve dev
gulp.task('serve.dev', (done: any) =>
  runSequence('build.dev',
              'server.start',
              'watch.dev',
              done));

gulp.task('serve.prod', (done: any) =>
  runSequence('build.prod', 'server.prod', done));
