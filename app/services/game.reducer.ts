import { Action, Reducer } from '@ngrx/store';
import { GameAction } from './game.action';
import { ITile } from '../interfaces/index';

export interface IGame {
  currentScore: number;
  highScore: number;
  keepPlaying: boolean;
  won: boolean;
  gameOver: boolean;
  winningValue: number;
  tiles: ITile[];
}

let initialState: IGame = {
  currentScore: 0,
  highScore: parseInt(localStorage.getItem('highScore')) || 0,
  keepPlaying: false,
  won: false,
  gameOver: false,
  winningValue: 2048,
  tiles: []
};

export const gameReducer: Reducer<any> = (state = initialState, action: Action) => {
  switch (action.type) {
    case GameAction.INIT:
      return Object.assign({}, state, { tiles: action.payload });
    case GameAction.START:
      return Object.assign({}, state, { gameOver: false, won: false, currentScore: 0, keepPlaying: false, tiles: action.payload });
    case GameAction.MOVE:
      return Object.assign({}, state, { tiles: action.payload });
    case GameAction.UPDATE_SCORE:
      let currentScore = state.currentScore + action.payload;
      let won = currentScore > state.winningValue;
      let gameOver = won && !state.keepPlaying;
      if (currentScore < state.highScore) {
        return Object.assign({}, state, { currentScore: currentScore, gameOver: gameOver, won: won });
      } else {
        localStorage.setItem('highScore', currentScore.toString());
        return Object.assign({}, state, { currentScore: currentScore, highScore: currentScore, gameOver: gameOver, won: won });
      }
    case GameAction.CONTINUE:
      return Object.assign({}, state, { gameOver: false, keepPlaying: true });
    case GameAction.GAMEOVER:
      return Object.assign({}, state, { gameOver: true, won: false });
    case GameAction.WIN:
      if (state.keepPlaying === true) {
        return Object.assign({}, state, { gameOver: false, won: true });
      } else {
        return Object.assign({}, state, { gameOver: true, won: true });
      }
    default:
      return state;
  }
};
