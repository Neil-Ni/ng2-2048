import {join} from 'path';
import {SeedConfig} from './seed.config';
import {InjectableDependency} from './seed.config.interfaces';

export class ProjectConfig extends SeedConfig {
  constructor() {
    super();
    this.APP_TITLE = 'ng2-2048';
  }
}
