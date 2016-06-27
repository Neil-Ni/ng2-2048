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
var tile_1 = require('../models/tile');
var index_1 = require('../enums/index');
var GridService = (function () {
    function GridService() {
        this.size = 4;
        this.startingTileNumber = 2;
        this.tiles = [];
    }
    GridService.prototype.getSize = function () {
        return this.size;
    };
    GridService.prototype.buildEmptyGameBoard = function () {
        var _this = this;
        this.forEach(function (x, y) { return _this.setCellAt({ x: x, y: y }, null); });
    };
    GridService.prototype.prepareTiles = function () {
        this.forEach(function (x, y, tile) {
            if (tile) {
                tile.savePosition();
                tile.reset();
            }
        });
    };
    ;
    GridService.prototype.traversalDirections = function (key) {
        var vector = index_1.VECTORS[key];
        var positions = { x: [], y: [] };
        for (var x = 0; x < this.size; x++) {
            positions.x.push(x);
            positions.y.push(x);
        }
        if (vector.x > 0) {
            positions.x = positions.x.reverse();
        }
        if (vector.y > 0) {
            positions.y = positions.y.reverse();
        }
        return positions;
    };
    ;
    GridService.prototype.calculateNextPosition = function (cell, key) {
        var vector = index_1.VECTORS[key];
        var previous;
        do {
            previous = cell;
            cell = {
                x: previous.x + vector.x,
                y: previous.y + vector.y
            };
        } while (this.withinGrid(cell) && this.cellAvailable(cell));
        return {
            newPosition: previous,
            next: this.getCellAt(cell)
        };
    };
    ;
    GridService.prototype.withinGrid = function (cell) {
        return cell.x >= 0 && cell.x < this.size &&
            cell.y >= 0 && cell.y < this.size;
    };
    ;
    GridService.prototype.cellAvailable = function (cell) {
        if (this.withinGrid(cell)) {
            return !this.getCellAt(cell);
        }
        else {
            return null;
        }
    };
    ;
    GridService.prototype.buildStartingPosition = function () {
        for (var x = 0; x < this.startingTileNumber; x++) {
            this.randomlyInsertNewTile();
        }
    };
    ;
    GridService.prototype.tileMatchesAvailable = function () {
        var totalSize = this.size * this.size;
        for (var i = 0; i < totalSize; i++) {
            var pos = this._positionToCoordinates(i);
            var tile = this.tiles[i];
            if (tile) {
                // Check all VECTORS
                for (var vectorName in index_1.VECTORS) {
                    var vector = index_1.VECTORS[vectorName];
                    var cell = { x: pos.x + vector.x, y: pos.y + vector.y };
                    var other = this.getCellAt(cell);
                    if (other && other.value === tile.value) {
                        return true;
                    }
                }
            }
        }
        return false;
    };
    ;
    GridService.prototype.getCellAt = function (pos) {
        if (this.withinGrid(pos)) {
            var x = this._coordinatesToPosition(pos);
            return this.tiles[x];
        }
        else {
            return null;
        }
    };
    ;
    GridService.prototype.setCellAt = function (pos, tile) {
        if (this.withinGrid(pos)) {
            var xPos = this._coordinatesToPosition(pos);
            this.tiles[xPos] = tile;
        }
    };
    ;
    GridService.prototype.moveTile = function (tile, newPosition) {
        var oldPos = {
            x: tile.x,
            y: tile.y
        };
        this.setCellAt(oldPos, null);
        this.setCellAt(newPosition, tile);
        tile.updatePosition(newPosition);
    };
    ;
    GridService.prototype.forEach = function (cb) {
        var totalSize = this.size * this.size;
        for (var i = 0; i < totalSize; i++) {
            var pos = this._positionToCoordinates(i);
            cb(pos.x, pos.y, this.tiles[i]);
        }
    };
    ;
    GridService.prototype._positionToCoordinates = function (i) {
        var x = i % this.size, y = (i - x) / this.size;
        return {
            x: x,
            y: y
        };
    };
    ;
    GridService.prototype._coordinatesToPosition = function (pos) {
        return (pos.y * this.size) + pos.x;
    };
    ;
    GridService.prototype.insertTile = function (tile) {
        var pos = this._coordinatesToPosition(tile);
        this.tiles[pos] = tile;
    };
    ;
    GridService.prototype.newTile = function (pos, value) {
        return new tile_1.Tile(pos, value);
    };
    ;
    GridService.prototype.removeTile = function (pos) {
        pos = this._coordinatesToPosition(pos);
        delete this.tiles[pos];
    };
    ;
    GridService.prototype.samePositions = function (a, b) {
        return a.x === b.x && a.y === b.y;
    };
    ;
    GridService.prototype.availableCells = function () {
        var cells = [], self = this;
        this.forEach(function (x, y) {
            var foundTile = self.getCellAt({ x: x, y: y });
            if (!foundTile) {
                cells.push({ x: x, y: y });
            }
        });
        return cells;
    };
    ;
    GridService.prototype.randomlyInsertNewTile = function () {
        var cell = this.randomAvailableCell(), tile = this.newTile(cell, 2);
        this.insertTile(tile);
    };
    ;
    GridService.prototype.randomAvailableCell = function () {
        var cells = this.availableCells();
        if (cells.length > 0) {
            return cells[Math.floor(Math.random() * cells.length)];
        }
    };
    ;
    GridService.prototype.anyCellsAvailable = function () {
        return this.availableCells().length > 0;
    };
    ;
    GridService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [])
    ], GridService);
    return GridService;
}());
exports.GridService = GridService;
//# sourceMappingURL=grid.service.js.map