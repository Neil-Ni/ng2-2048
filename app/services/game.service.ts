import { Injectable }   from '@angular/core';
import { GridService }  from './grid.service';
import { IGrid, ITile } from '../interfaces/index';

@Injectable()
export class GameService {
  public currentScore: number  = 0;
  public win: boolean          = false;
  public gameOver: boolean     = false;
  public grid: IGrid[];
  public tiles: ITile[];
  public gameSize: number      = 0;
  private winningValue: number = 2048;
  private gridService: GridService;

  constructor(private gridService: GridService) {
    this.gameSize = this.gridService.getSize();
  }

  get grid(): IGrid[] {
    return this.gridService.grid || [];
  }

  get tiles(): IGrid[] {
    return this.gridService.tiles || [];
  }

  reset() {
    this.gameOver = false;
    this.win = false;
    this.currentScore = 0;
  }

  newGame() {
    this.gridService.buildEmptyGameBoard();
    this.gridService.buildStartingPosition();
    this.reset();
  };
  
  move(key: string): boolean {
    if(this.win) { return false; }
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

            this.updateScore(this.currentScore + cell.next.value);

            if(merged.value >= this.winningValue) {
              hasWon = true;
            }
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

    if (hasWon && !this.win) {
      this.win = true;
    }

    if (hasMoved) {
      this.gridService.randomlyInsertNewTile();

      if (this.win || !this.movesAvailable()) {
        this.gameOver = true;
      }
    }
  }

  movesAvailable(): boolean {
    return this.gridService.anyCellsAvailable() || this.gridService.tileMatchesAvailable();
  };

  get highScore(): number {
    return parseInt(localStorage.getItem('highScore')) || 0;
  }

  set highScore(newScore: number) {
    localStorage.setItem('highScore', newScore.toString());
  }

  updateScore(newScore: number) {
    this.currentScore = newScore;
    if(this.currentScore > this.highScore) {
      this.highScore = newScore;
    }
  };
}
