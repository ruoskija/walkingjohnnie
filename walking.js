import { initGame, togglePause, stepOnce, setFPSLimit, toggleSpeedLimit } from './modules/game.js';
document.onload = initGame(document.getElementById('game'));
let pauseButton = document.getElementById('pauseButton');
let stepButton = document.getElementById('stepButton');
let FPSSlider = document.getElementById('FPSSlider');
let speedLimitCheckbox = document.getElementById('speedLimitCheckbox');
if (pauseButton) {
    pauseButton.addEventListener('click', togglePause);
}
if (stepButton) {
    stepButton.addEventListener('click', stepOnce);
}
if (FPSSlider) {
    FPSSlider.addEventListener('input', () => setFPSLimit(FPSSlider.value));
}
if (speedLimitCheckbox) {
    speedLimitCheckbox.addEventListener('change', () => toggleSpeedLimit(speedLimitCheckbox.checked));
}
