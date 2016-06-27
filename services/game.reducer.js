"use strict";
var game_action_1 = require('./game.action');
var initialState = {
    currentScore: 0,
    highScore: parseInt(localStorage.getItem('highScore')) || 0,
    keepPlaying: false,
    won: false,
    gameOver: false,
    winningValue: 2048,
    tiles: []
};
exports.gameReducer = function (state, action) {
    if (state === void 0) { state = initialState; }
    switch (action.type) {
        case game_action_1.GameAction.INIT:
            return Object.assign({}, state, { tiles: action.payload });
        case game_action_1.GameAction.START:
            return Object.assign({}, state, { gameOver: false, won: false, currentScore: 0, keepPlaying: false, tiles: action.payload });
        case game_action_1.GameAction.MOVE:
            return Object.assign({}, state, { tiles: action.payload });
        case game_action_1.GameAction.UPDATE_SCORE:
            var currentScore = state.currentScore + action.payload;
            var won = currentScore > state.winningValue;
            var gameOver = won && !state.keepPlaying;
            if (currentScore < state.highScore) {
                return Object.assign({}, state, { currentScore: currentScore, gameOver: gameOver, won: won });
            }
            else {
                localStorage.setItem('highScore', currentScore.toString());
                return Object.assign({}, state, { currentScore: currentScore, highScore: currentScore, gameOver: gameOver, won: won });
            }
        case game_action_1.GameAction.CONTINUE:
            return Object.assign({}, state, { gameOver: false, keepPlaying: true });
        case game_action_1.GameAction.GAMEOVER:
            return Object.assign({}, state, { gameOver: true, won: false });
        case game_action_1.GameAction.WIN:
            if (state.keepPlaying === true) {
                return Object.assign({}, state, { gameOver: false, won: true });
            }
            else {
                return Object.assign({}, state, { gameOver: true, won: true });
            }
        default:
            return state;
    }
};
//# sourceMappingURL=game.reducer.js.map