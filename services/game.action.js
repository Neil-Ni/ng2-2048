"use strict";
var GameAction = (function () {
    function GameAction() {
    }
    GameAction.INIT = 'GameAction.INIT';
    GameAction.START = 'GameAction.START';
    GameAction.MOVE = 'GameAction.MOVE';
    GameAction.UPDATE_SCORE = 'GameAction.UPDATE_SCORE';
    GameAction.GAMEOVER = 'GameAction.GAMEOVER';
    GameAction.CONTINUE = 'GameAction.CONTINUE';
    GameAction.RESTART = 'GameAction.RESTART';
    GameAction.WIN = 'GameAction.WIN';
    return GameAction;
}());
exports.GameAction = GameAction;
//# sourceMappingURL=game.action.js.map