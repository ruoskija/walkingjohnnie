import { startGame, togglePause } from './modules/game.js';
document.onload = startGame(document.getElementById('game'));
let pauseButton = document.getElementById('pauseButton');
if (pauseButton) {
    pauseButton.addEventListener("click", togglePause);
}