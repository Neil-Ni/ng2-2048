"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require('@angular/core');
var game_service_1 = require('../../services/game.service');
var MessageComponent = (function () {
    function MessageComponent(gameService) {
        this.gameService = gameService;
    }
    MessageComponent.prototype.restart = function () {
        this.gameService.newGame();
    };
    MessageComponent.prototype.keepGoing = function () {
        this.gameService.keepGoing();
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Boolean)
    ], MessageComponent.prototype, "won", void 0);
    MessageComponent = __decorate([
        core_1.Component({
            selector: 'message',
            templateUrl: 'app/components/message/message.component.html'
        }), 
        __metadata('design:paramtypes', [game_service_1.GameService])
    ], MessageComponent);
    return MessageComponent;
}());
exports.MessageComponent = MessageComponent;
//# sourceMappingURL=message.component.js.map