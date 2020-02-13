import { initGame, togglePause, stepOnce, setFPS } from './modules/game.js';
document.onload = initGame(document.getElementById('game'));
let pauseButton = document.getElementById('pauseButton');
let stepButton = document.getElementById('stepButton');
let FPSSlider = document.getElementById('FPSSlider');
if (pauseButton) {
    pauseButton.addEventListener('click', togglePause);
}
if (stepButton) {
    stepButton.addEventListener('click', stepOnce);
}
if (FPSSlider) {
    FPSSlider.addEventListener('input', () => setFPSLimit(FPSSlider.value));
}
