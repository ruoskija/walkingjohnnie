import { startGame, togglePause, stepOnce } from './modules/game.js';
document.onload = startGame(document.getElementById('game'));
let pauseButton = document.getElementById('pauseButton');
let stepButton = document.getElementById('stepButton');
if (pauseButton) {
    pauseButton.addEventListener("click", togglePause);
}
if (stepButton) {
    stepButton.addEventListener("click", stepOnce);
}
