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
var tile_component_1 = require('../tile/tile.component');
var GridComponent = (function () {
    function GridComponent() {
    }
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Array)
    ], GridComponent.prototype, "tiles", void 0);
    GridComponent = __decorate([
        core_1.Component({
            selector: 'grid',
            directives: [tile_component_1.TileComponent],
            templateUrl: 'app/components/grid/grid.component.html'
        }), 
        __metadata('design:paramtypes', [])
    ], GridComponent);
    return GridComponent;
}());
exports.GridComponent = GridComponent;
//# sourceMappingURL=grid.component.js.map