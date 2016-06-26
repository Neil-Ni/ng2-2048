import { IPosition } from './position';

export interface ITile extends IPosition {
  originalX:  number;
  originalY:  number;
  x:          number;
  y:          number;
  value:      number;
  id:         string;
  merged:     boolean;
}
