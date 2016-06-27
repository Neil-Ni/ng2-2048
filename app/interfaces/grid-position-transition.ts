import { IPosition } from './position';
import { ITile } from './tile';

export interface IGridPositionTransition {
  newPosition: IPosition,
  next: ITile
}
