import { bootstrap } from '@angular/platform-browser-dynamic';
import { AppComponent } from './app.component'
import { GridComponent } from './components/grid/grid.component'
import { enableProdMode } from '@angular/core';
import { GridService, GameService } from './services/index';

enableProdMode();

bootstrap(AppComponent, [GridService, GameService, GridComponent]);
