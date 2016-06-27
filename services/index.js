"use strict";
function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
__export(require('./grid.service'));
__export(require('./game.service'));
__export(require('./uniqueId.service'));
var game_reducer_1 = require('./game.reducer');
exports.APP_STORE = {
    game: game_reducer_1.gameReducer
};
//# sourceMappingURL=index.js.map