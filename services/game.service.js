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
var grid_service_1 = require('./grid.service');
var store_1 = require('@ngrx/store');
var game_action_1 = require('./game.action');
require('rxjs/add/operator/map');
var GameService = (function () {
    function GameService(gridService, store) {
        this.gridService = gridService;
        this.store = store;
        var store$ = store.select('game');
        this.currentScore = store$.map(function (_a) {
            var currentScore = _a.currentScore;
            return currentScore;
        });
        this.highScore = store$.map(function (_a) {
            var highScore = _a.highScore;
            return highScore;
        });
        this.tiles = store$.map(function (_a) {
            var tiles = _a.tiles;
            return tiles;
        });
        this.gameOver = store$.map(function (_a) {
            var gameOver = _a.gameOver;
            return gameOver;
        });
        this.won = store$.map(function (_a) {
            var won = _a.won;
            return won;
        });
    }
    GameService.prototype.newGame = function () {
        this.gridService.buildEmptyGameBoard();
        this.gridService.buildStartingPosition();
        this.store.dispatch({ type: game_action_1.GameAction.START, payload: this.gridService.tiles });
    };
    ;
    GameService.prototype.move = function (key) {
        var _this = this;
        if (this.store._value.game.won && !this.store._value.game.keepPlaying) {
            return false;
        }
        var positions = this.gridService.traversalDirections(key);
        var hasMoved = false;
        var hasWon = false;
        // Update Grid
        this.gridService.prepareTiles();
        positions.x.forEach(function (x) {
            positions.y.forEach(function (y) {
                var originalPosition = { x: x, y: y };
                var tile = _this.gridService.getCellAt(originalPosition);
                if (tile) {
                    var cell = _this.gridService.calculateNextPosition(tile, key);
                    var next = cell.next;
                    if (next &&
                        next.value === tile.value &&
                        !next.merged) {
                        // MERGE
                        var newValue = tile.value * 2;
                        var merged = _this.gridService.newTile(tile, newValue);
                        merged.merged = [tile, cell.next];
                        _this.gridService.insertTile(merged);
                        _this.gridService.removeTile(tile);
                        _this.gridService.moveTile(merged, next);
                        _this.updateScore(cell.next.value);
                        hasMoved = true; // we moved with a merge
                    }
                    else {
                        _this.gridService.moveTile(tile, cell.newPosition);
                    }
                    if (!_this.gridService.samePositions(originalPosition, cell.newPosition)) {
                        hasMoved = true;
                    }
                }
            });
        });
        if (hasMoved) {
            this.gridService.randomlyInsertNewTile();
            this.store.dispatch({ type: game_action_1.GameAction.MOVE, payload: this.gridService.tiles });
            if (!this.movesAvailable()) {
                this.store.dispatch({ type: game_action_1.GameAction.GAMEOVER });
            }
        }
    };
    GameService.prototype.movesAvailable = function () {
        return this.gridService.anyCellsAvailable() || this.gridService.tileMatchesAvailable();
    };
    ;
    GameService.prototype.updateScore = function (newAdditionalScore) {
        this.store.dispatch({ type: game_action_1.GameAction.UPDATE_SCORE, payload: newAdditionalScore });
    };
    ;
    GameService.prototype.keepGoing = function () {
        this.store.dispatch({ type: game_action_1.GameAction.CONTINUE });
    };
    GameService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [grid_service_1.GridService, store_1.Store])
    ], GameService);
    return GameService;
}());
exports.GameService = GameService;
//# sourceMappingURL=game.service.js.map