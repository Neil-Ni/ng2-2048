export * from './grid.service';
export * from './game.service';
export * from './uniqueId.service';

import { gameReducer } from './game.reducer';

export const APP_STORE:any = {
  game: gameReducer
};
