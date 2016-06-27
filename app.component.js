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
var game_service_1 = require('./services/game.service');
var grid_component_1 = require('./components/grid/grid.component');
var index_1 = require('./enums/index');
var message_component_1 = require('./components/message/message.component');
var AppComponent = (function () {
    function AppComponent(game) {
        this.game = game;
        this.game.newGame();
    }
    AppComponent.prototype.newGame = function () {
        this.game.newGame();
    };
    AppComponent.prototype.onKeydown = function (event) {
        var key = index_1.DIRECTIONS[event.which];
        if (key) {
            event.preventDefault();
            this.game.move(key);
        }
    };
    __decorate([
        core_1.HostListener('window:keydown', ['$event']), 
        __metadata('design:type', Function), 
        __metadata('design:paramtypes', [KeyboardEvent]), 
        __metadata('design:returntype', void 0)
    ], AppComponent.prototype, "onKeydown", null);
    AppComponent = __decorate([
        core_1.Component({
            selector: 'my-app',
            directives: [grid_component_1.GridComponent, message_component_1.MessageComponent],
            templateUrl: 'app/app.component.html'
        }), 
        __metadata('design:paramtypes', [game_service_1.GameService])
    ], AppComponent);
    return AppComponent;
}());
exports.AppComponent = AppComponent;
//# sourceMappingURL=app.component.js.map