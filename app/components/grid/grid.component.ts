import { Component, Input } from '@angular/core';
import { IGrid } from '../../interfaces/index';

@Component({
  selector: 'grid',
  directives: [],
  templateUrl: 'app/components/grid/grid.component.html'
})

export class GridComponent {
  @Input() size: number;
  @Input() grid: IGrid[];
}
