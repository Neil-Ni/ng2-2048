import { Component, Input } from '@angular/core';
import { ITile }  from '../../interfaces/index';
import { TileComponent } from '../tile/tile.component';

@Component({
  selector: 'grid',
  directives: [TileComponent],
  templateUrl: 'components/grid/grid.component.html'
})

export class GridComponent {
  @Input() tiles: ITile[];
}
