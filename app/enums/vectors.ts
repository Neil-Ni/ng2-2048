import { IPosition } from '../interfaces/index';

export const VECTORS = {
  LEFT:  <IPosition>{ x: -1, y: 0 },
  RIGHT: <IPosition>{ x: 1, y: 0 },
  UP:    <IPosition>{ x: 0, y: -1 },
  DOWN:  <IPosition>{ x: 0, y: 1 }
};
