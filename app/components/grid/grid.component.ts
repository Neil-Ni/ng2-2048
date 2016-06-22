import { Component, Input } from '@angular/core';

@Component({
  selector: 'grid',
  directives: [],
  templateUrl: 'app/components/grid/grid.component.html'
})

export class GridComponent {
  @Input public gameSize:string;
}
