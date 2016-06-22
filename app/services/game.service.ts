import { Injectable }  from '@angular/core';
import { GridService } from './grid.service';
import { IGrid, ITile } from '../interfaces/index';

@Injectable()
export class GameService {
  public currentScore: number = 0;
  public win: boolean         = false;
  public gameOver: boolean    = false;
  public highScore: number    = 0;
  public grid: IGrid[];
  public tiles: ITile[];
  public gameSize: number     = 0;
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

  newGame = function() {
    this.gridService.buildEmptyGameBoard();
    this.gridService.buildStartingPosition();
    this.reset();
  };
}
