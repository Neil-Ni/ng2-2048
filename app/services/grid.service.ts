import { Injectable }   from '@angular/core';
import { IGrid, ITile } from '../interfaces/index';
import { IPosition } from '../interfaces/position';
import { Tile } from '../models/tile';

@Injectable()
export class GridService {
  public grid: IGrid[];
  public tiles: ITile[];
  public size: number = 4;
  public startingTileNumber = 2;
  vectors: any = {
    'left': { x: -1, y: 0 },
    'right': { x: 1, y: 0 },
    'up': { x: 0, y: -1 },
    'down': { x: 0, y: 1 }
  };

  constructor() {
    this.grid   = [];
    this.tiles  = [];
  }

  getSize(): number {
    return this.size;
  }
  
  buildEmptyGameBoard(): void {
    for (var x = 0; x < this.size * this.size; x++) {
      this.grid[x] = null;
    }

    this.forEach((x,y) => this.setCellAt({x:x,y:y}, null))
  }

  prepareTiles(): void {
    this.forEach((x,y,tile) => {
      if (tile) {
        tile.savePosition();
        tile.reset();
      }
    })
  };
  
  traversalDirections(key: string): any {
    var vector = this.vectors[key];
    var positions = {x: [], y: []};
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

  calculateNextPosition(cell, key): any {
    var vector = this.vectors[key];
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
  
  withinGrid(cell): any {
    return cell.x >= 0 && cell.x < this.size &&
      cell.y >= 0 && cell.y < this.size;
  };

  cellAvailable(cell): any {
    if (this.withinGrid(cell)) {
      return !this.getCellAt(cell);
    } else {
      return null;
    }
  };
  
  buildStartingPosition(): void {
    for (var x = 0; x < this.startingTileNumber; x++) {
      this.randomlyInsertNewTile();
    }
  };
  
  tileMatchesAvailable(): boolean {
    var totalSize = this.size * this.size;
    for (var i = 0; i < totalSize; i++) {
      var pos = this._positionToCoordinates(i);
      var tile = this.tiles[i];
  
      if (tile) {
        // Check all vectors
        for (var vectorName in this.vectors) {
          var vector = this.vectors[vectorName];
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

  getCellAt = function(pos): void {
    if (this.withinGrid(pos)) {
      var x = this._coordinatesToPosition(pos);
      return this.tiles[x];
    } else {
      return null;
    }
  };
  
  setCellAt(pos, tile): void {
    if (this.withinGrid(pos)) {
      var xPos = this._coordinatesToPosition(pos);
      this.tiles[xPos] = tile;
    }
  };

  moveTile(tile, newPosition): void {
    var oldPos = {
      x: tile.x,
      y: tile.y
    };
  
    this.setCellAt(oldPos, null);
    this.setCellAt(newPosition, tile);
  
    tile.updatePosition(newPosition);
  };

  forEach(cb) {
    var totalSize = this.size * this.size;
    for (var i = 0; i < totalSize; i++) {
      var pos = this._positionToCoordinates(i);
      cb(pos.x, pos.y, this.tiles[i]);
    }
  };

  _positionToCoordinates(i) {
    var x = i % this.size,
      y = (i - x) / this.size;
    return {
      x: x,
      y: y
    };
  };

  _coordinatesToPosition(pos) {
    return (pos.y * this.size) + pos.x;
  };

  insertTile(tile) {
    var pos = this._coordinatesToPosition(tile);
    this.tiles[pos] = tile;
  };

  newTile(pos, value) {
    return new Tile(pos, value);
  };

  removeTile(pos) {
    pos = this._coordinatesToPosition(pos);
    delete this.tiles[pos];
  };

  samePositions(a, b) {
    return a.x === b.x && a.y === b.y;
  };

  availableCells() {
    var cells = [],
      self = this;
  
    this.forEach(function(x,y) {
      var foundTile = self.getCellAt({x:x, y:y});
      if (!foundTile) {
        cells.push({x:x,y:y});
      }
    });
  
    return cells;
  };

  randomlyInsertNewTile() {
    var cell = this.randomAvailableCell(),
      tile = this.newTile(cell, 2);
    this.insertTile(tile);
  };

  randomAvailableCell() {
    var cells = this.availableCells();
    if (cells.length > 0) {
      return cells[Math.floor(Math.random() * cells.length)];
    }
  };

  anyCellsAvailable() {
    return this.availableCells().length > 0;
  };
}
