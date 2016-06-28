import { IPosition, ITile } from '../interfaces/index';
import { uniqueIdService } from '../services/index';

export class Tile implements ITile {
  originalX:  number;
  originalY:  number;
  x:          number;
  y:          number;
  value:      number;
  id:         string;
  merged:     boolean;

  constructor(position: IPosition, value: number) {
    this.x      = position.x;
    this.y      = position.y;
    this.value  = value || 2;
    this.id = uniqueIdService.generate();
    this.merged = false;
  }

  get position(): IPosition {
    return <IPosition>{x: this.x, y: this.y};
  }

  savePosition(): void {
    this.originalX = this.x;
    this.originalY = this.y;
  }

  reset(): void {
    this.merged = false;
  }

  updateValue(newVal: number) {
    this.value = newVal;
  };

  updatePosition(newPosition: IPosition) {
    this.x = newPosition.x;
    this.y = newPosition.y;
  };
}
