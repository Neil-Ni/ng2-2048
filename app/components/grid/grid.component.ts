import { Component, Input } from '@angular/core';
import { IGrid, ITile }  from '../../interfaces/index';
import { TileComponent } from '../tile/tile.component';

@Component({
  selector: 'grid',
  directives: [TileComponent],
  templateUrl: 'app/components/grid/grid.component.html'
})

export class GridComponent {
  @Input() size: number;
  @Input() grid: IGrid[];
  @Input() tiles: ITile[];
}
