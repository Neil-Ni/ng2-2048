import { Injectable, Inject }   from '@angular/core';
import { GridService }    from './grid.service';
import { Tile }           from '../models/index';
import { Store, Action }  from '@ngrx/store';
import { IGame }          from './game.reducer';
import { GameAction }     from './game.action';
import { Observable }     from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import {IPosition} from "../../dist/tmp/interfaces/position";

@Injectable()
export class GameService {
  public currentScore: Observable<number>;
  public highScore:    Observable<number>;
  public tiles:        Observable<Tile[]>;
  public gameOver:     Observable<boolean>;
  public won:          Observable<boolean>;

  constructor(
    private gridService: GridService,
    private store: Store<any>
  ) {
    const store$ = store.select<IGame>('game');
    this.currentScore = store$.map(({currentScore}: IGame) => currentScore);
    this.highScore = store$.map(({highScore}: IGame) => highScore);
    this.tiles = store$.map(({tiles}: IGame) => tiles);
    this.gameOver = store$.map(({gameOver}: IGame) => gameOver);
    this.won = store$.map(({won}: IGame) => won);
  }

  newGame(): void {
    this.gridService.buildEmptyGameBoard();
    this.gridService.buildStartingPosition();
    this.store.dispatch({type: GameAction.START, payload: this.gridService.tiles});
  };
  
  move(key: string): boolean {
    if(this.store._value.game.won && !this.store._value.game.keepPlaying) { return false; }
    let positions = this.gridService.traversalDirections(key);
    let hasMoved = false;

    this.gridService.prepareTiles();

    positions.x.forEach((x: number) => {
      positions.y.forEach((y: number) => {
        let originalPosition: IPosition = {x: x,y: y};
        let tile: Tile = this.gridService.getCellAt(originalPosition);

        if (tile) {
          let cell = this.gridService.calculateNextPosition(tile, key);
          let next = cell.next;

          if (next && next.value === tile.value && !next.merged) {
            let newValue = tile.value * 2;
            let merged = new Tile(tile, newValue);
            merged.merged = true;

            this.gridService.insertTile(merged);
            this.gridService.removeTile(tile);
            this.gridService.moveTile(merged, next);

            this.store.dispatch({type: GameAction.UPDATE_SCORE, payload: cell.next.value});
            this.store.dispatch({type: GameAction.UPDATE_HIGEST_TILE, payload: merged.value});

            hasMoved = true;
          } else {
            this.gridService.moveTile(tile, cell.newPosition);
          }

          if (!this.gridService.samePositions(originalPosition, cell.newPosition)) {
            hasMoved = true;
          }
        }
      });
    });

    if (hasMoved) {
      this.gridService.randomlyInsertNewTile();
      this.store.dispatch({type: GameAction.MOVE, payload: this.gridService.tiles});

      if (!this.movesAvailable()) {
        this.store.dispatch({type: GameAction.GAMEOVER});
      }
    }
  }

  movesAvailable(): boolean {
    return this.gridService.anyCellsAvailable() || this.gridService.tileMatchesAvailable();
  };

  keepGoing(): void {
    this.store.dispatch({type: GameAction.CONTINUE});
  }
}
