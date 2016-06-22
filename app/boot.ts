import { bootstrap } from '@angular/platform-browser-dynamic';
import { AppComponent } from './app.component'
import { enableProdMode } from '@angular/core';
import { GameService } from './services/game.service';

enableProdMode();

bootstrap(AppComponent, [GameService]);
