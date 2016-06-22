import { Injectable } from '@angular/core';

@Injectable()
export class GameService {
  public currentScore: number = 0;
  public win: boolean         = false;
  public gameOver: boolean    = false;
  public highScore: number    = 0;

  constructor() {}
}
