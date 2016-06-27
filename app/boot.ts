import { bootstrap }      from '@angular/platform-browser-dynamic';
import { AppComponent }   from './app.component'
import { GridComponent }  from './components/grid/grid.component'
import { TileComponent }  from './components/tile/tile.component'
import { enableProdMode } from '@angular/core';
import { provideStore }   from '@ngrx/store';
import { GridService }    from './services/grid.service';
import { GameService }    from './services/game.service';
import { APP_STORE }      from './services/index';

enableProdMode();

bootstrap(
  AppComponent, [
    GridService,
    GameService,
    TileComponent,
    GridComponent,
    provideStore(APP_STORE)
  ]
);
