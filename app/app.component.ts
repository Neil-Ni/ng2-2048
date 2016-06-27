import { Component, HostListener } from '@angular/core';
import { GameService }             from './services/game.service';
import { GridComponent }           from './components/grid/grid.component';
import { DIRECTIONS }              from './enums/index';
import { MessageComponent }        from './components/message/message.component';

@Component({
  selector: 'my-app',
  directives: [GridComponent, MessageComponent],
  templateUrl: './app.component.html'
})

export class AppComponent {
  constructor(public game: GameService) {
    this.newGame();
  }

  public newGame(): void {
    this.game.newGame();
  }

  @HostListener('window:keydown', ['$event'])
  public onKeydown(event: KeyboardEvent): void {
    var key = DIRECTIONS[event.which];
    if (key) {
      event.preventDefault();
      this.game.move(key);
    }
  }
}
