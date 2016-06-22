import { Component, HostListener }   from '@angular/core';
import { GameService } from './services/game.service';
import { GridComponent } from './components/grid/grid.component';

enum Directions {
  LEFT = 37,
  UP =  38,
  RIGHT = 39,
  DOWN = 40
}

@Component({
  selector: 'my-app',
  directives: [GridComponent],
  templateUrl: 'app/app.component.html'
})

export class AppComponent {
  constructor(public game :GameService) {
    this.game.newGame();
  }

  public newGame(): void {}

  @HostListener('window:keydown', ['$event'])
  public onKeydown(event: KeyboardEvent): void {
    var key = Directions[event.which];
    if (key) {
      event.preventDefault();
    }
  }
}
