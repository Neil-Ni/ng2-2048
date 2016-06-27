"use strict";
var index_1 = require('../services/index');
var Tile = (function () {
    function Tile(position, value) {
        this.x = position.x;
        this.y = position.y;
        this.value = value || 2;
        this.id = index_1.uniqueIdService.generate();
        this.merged = null;
    }
    Tile.prototype.savePosition = function () {
        this.originalX = this.x;
        this.originalY = this.y;
    };
    Tile.prototype.reset = function () {
        this.merged = null;
    };
    Tile.prototype.setMergedBy = function (arr) {
        var self = this;
        arr.forEach(function (tile) {
            tile.merged = true;
            tile.updatePosition(self.getPosition());
        });
    };
    ;
    Tile.prototype.updateValue = function (newVal) {
        this.value = newVal;
    };
    ;
    Tile.prototype.updatePosition = function (newPosition) {
        this.x = newPosition.x;
        this.y = newPosition.y;
    };
    ;
    Tile.prototype.getPosition = function () {
        return { x: this.x, y: this.y };
    };
    ;
    return Tile;
}());
exports.Tile = Tile;
//# sourceMappingURL=tile.js.map