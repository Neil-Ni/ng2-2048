import { Injectable }   from '@angular/core';
import {
  IPosition,
  IGridPositions,
  IGridPositionTransition
} from '../interfaces/index';
import { Tile }         from '../models/tile';
import { VECTORS }      from '../enums/index';

@Injectable()
export class GridService {
  public tiles: Tile[];
  public size: number = 4;
  public startingTileNumber = 2;

  constructor() {
    this.tiles  = [];
  }

  getSize(): number {
    return this.size;
  }

  buildEmptyGameBoard(): void {
    this.forEach((x: number,y: number) => this.setCellAt({x: x,y: y}, null))
  }

  prepareTiles(): void {
    this.forEach((x: number,y: number, tile: Tile) => {
      if (tile) {
        tile.savePosition();
        tile.reset();
      }
    })
  };
  
  traversalDirections(key: string): IGridPositions {
    var vector: IPosition = VECTORS[key];
    var positions = <IGridPositions>{x: [], y: []};
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

  calculateNextPosition(cell: IPosition, key: string): IGridPositionTransition {
    let vector: IPosition = VECTORS[key];
    let previous: IPosition = null;

    do {
      previous = cell;
      cell = {
        x: previous.x + vector.x,
        y: previous.y + vector.y
      };
    } while (this.cellAvailable(cell));
  
    return {
      newPosition: previous,
      next: this.getCellAt(cell)
    };
  };
  
  withinGrid(cell: IPosition): boolean {
    return cell.x >= 0 && cell.x < this.size &&
      cell.y >= 0 && cell.y < this.size;
  };

  cellAvailable(cell: IPosition): boolean {
    if (this.withinGrid(cell)) {
      return !this.getCellAt(cell);
    } else {
      return false;
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
        // Check all VECTORS
        for (var vectorName in VECTORS) {
          var vector: IPosition = VECTORS[vectorName];
          var cell: IPosition = { x: pos.x + vector.x, y: pos.y + vector.y };
          var other = this.getCellAt(cell);
          if (other && other.value === tile.value) {
            return true;
          }
        }
      }
    }
    return false;
  };

  getCellAt(pos: IPosition): Tile {
    if (this.withinGrid(pos)) {
      var x = this._coordinatesToPosition(pos);
      return this.tiles[x];
    } else {
      return null;
    }
  };

  setCellAt(pos: IPosition, tile: Tile): void {
    if (this.withinGrid(pos)) {
      var xPos = this._coordinatesToPosition(pos);
      this.tiles[xPos] = tile;
    }
  };

  moveTile(tile: Tile, newPosition: IPosition): void {
    this.setCellAt(tile.position, null);
    this.setCellAt(newPosition, tile);

    tile.updatePosition(newPosition);
  };

  forEach(cb: any): void {
    let totalSize = this.size * this.size;
    for (let i = 0; i < totalSize; i++) {
      let pos = this._positionToCoordinates(i);
      cb(pos.x, pos.y, this.tiles[i]);
    }
  };

  _positionToCoordinates(i: number): IPosition {
    let x = i % this.size;
    let y = (i - x) / this.size;
    return {
      x: x,
      y: y
    };
  };

  _coordinatesToPosition(pos: IPosition): number {
    return (pos.y * this.size) + pos.x;
  };

  insertTile(tile: Tile) {
    var pos = this._coordinatesToPosition(tile);
    this.tiles[pos] = tile;
  };

  removeTile(pos: IPosition) {
    let index = this._coordinatesToPosition(pos);
    delete this.tiles[index];
  };

  samePositions(a: IPosition, b: IPosition): boolean {
    return a.x === b.x && a.y === b.y;
  };

  availableCells(): IPosition[] {
    let cells: IPosition[] = [];

    this.forEach((x: number,y: number) => {
      let foundTile = this.getCellAt({x: x, y: y});
      if (!foundTile) {
        cells.push({x: x,y: y});
      }
    });

    return cells;
  };

  randomlyInsertNewTile() {
    let cell = this.randomAvailableCell();
    let tile = new Tile(cell, 2);
    this.insertTile(tile);
  };

  randomAvailableCell(): IPosition {
    let cells: IPosition[] = this.availableCells();
    if (cells.length > 0) {
      return cells[Math.floor(Math.random() * cells.length)];
    }
  };

  anyCellsAvailable() {
    return this.availableCells().length > 0;
  };
}
