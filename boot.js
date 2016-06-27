"use strict";
var platform_browser_dynamic_1 = require('@angular/platform-browser-dynamic');
var app_component_1 = require('./app.component');
var grid_component_1 = require('./components/grid/grid.component');
var tile_component_1 = require('./components/tile/tile.component');
var core_1 = require('@angular/core');
var store_1 = require('@ngrx/store');
var index_1 = require('./services/index');
core_1.enableProdMode();
platform_browser_dynamic_1.bootstrap(app_component_1.AppComponent, [
    index_1.GridService,
    index_1.GameService,
    tile_component_1.TileComponent,
    grid_component_1.GridComponent,
    store_1.provideStore(index_1.APP_STORE)
]);
//# sourceMappingURL=boot.js.map