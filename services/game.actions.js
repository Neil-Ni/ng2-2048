System.register([], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var GameAction;
    return {
        setters:[],
        execute: function() {
            GameAction = (function () {
                function GameAction() {
                }
                GameAction.ADD = 'GameAction.ADD';
                GameAction.CREATE = 'GameAction.CREATE';
                GameAction.UPDATE = 'GameAction.UPDATE';
                GameAction.DELETE = 'GameAction.DELETE';
                return GameAction;
            }());
            exports_1("GameAction", GameAction);
        }
    }
});
//# sourceMappingURL=game.actions.js.map