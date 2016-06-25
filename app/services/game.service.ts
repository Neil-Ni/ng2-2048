import { Injectable, Inject }   from '@angular/core';
import { GridService }    from './grid.service';
import { ITile }          from '../interfaces/index';
import { Store, Action }  from '@ngrx/store';
import { IGame }          from './game.reducer';
import { GameAction }     from './game.action';
import { Observable }     from 'rxjs/Observable';
import 'rxjs/add/operator/map';

@Injectable()
export class GameService {
  public currentScore: Observable<number>;
  public highScore:    Observable<number>;
  public tiles:        Observable<ITile[]>;
  public gameOver:     Observable<boolean>;
  public won:          Observable<boolean>;
  private gridService: GridService;

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

  newGame() {
    this.gridService.buildEmptyGameBoard();
    this.gridService.buildStartingPosition();
    this.store.dispatch({type: GameAction.START, payload: this.gridService.tiles});
  };
  
  move(key: string): boolean {
    if(this.store._value.game.won && !this.store._value.game.keepPlaying) { return false; }
    var positions = this.gridService.traversalDirections(key);
    var hasMoved = false;
    var hasWon = false;

    // Update Grid
    this.gridService.prepareTiles();

    positions.x.forEach((x) => {
      positions.y.forEach((y) => {
        var originalPosition = {x:x,y:y};
        var tile: ITile = this.gridService.getCellAt(originalPosition);

        if (tile) {
          let cell = this.gridService.calculateNextPosition(tile, key);
          let next = cell.next;

          if (next &&
            next.value === tile.value &&
            !next.merged) {

            // MERGE
            var newValue = tile.value * 2;

            var merged = this.gridService.newTile(tile, newValue);
            merged.merged = [tile, cell.next];

            this.gridService.insertTile(merged);
            this.gridService.removeTile(tile);

            this.gridService.moveTile(merged, next);

            this.updateScore(cell.next.value);

            hasMoved = true; // we moved with a merge
          } else {
            this.gridService.moveTile(tile, cell.newPosition);
          }

          if (!this.gridService.samePositions(originalPosition,cell.newPosition)) {
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

  updateScore(newAdditionalScore: number) {
    this.store.dispatch({type: GameAction.UPDATE_SCORE, payload: newAdditionalScore});
  };

  keepGoing() {
    this.store.dispatch({type: GameAction.CONTINUE});
  }
}
