import { Component, Input } from '@angular/core';
import { GameService }  from '../../services/game.service';

@Component({
  selector: 'message',
  templateUrl: 'components/message/message.component.html'
})

export class MessageComponent {
  @Input() won: boolean;

  constructor(private gameService: GameService) {}

  restart() {
    this.gameService.newGame();
  }

  keepGoing() {
    this.gameService.keepGoing();
  }
}
