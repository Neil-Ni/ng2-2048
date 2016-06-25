import {join} from 'path';
import {SeedConfig} from './seed.config';
import {InjectableDependency} from './seed.config.interfaces';

export class ProjectConfig extends SeedConfig {
  PROJECT_TASKS_DIR = join(process.cwd(), this.TOOLS_DIR, 'tasks', 'project');

  constructor() {
    super();
    this.APP_TITLE = 'ng2-2048';

    let additional_deps: InjectableDependency[] = [];

    const seedDependencies = this.NPM_DEPENDENCIES;

    this.NPM_DEPENDENCIES = seedDependencies.concat(additional_deps);

    this.FONTS_DEPENDENCIES = [this.FONTS_SRC];
  }
}
