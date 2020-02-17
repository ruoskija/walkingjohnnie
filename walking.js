import { Game } from './modules/game.js';

let game = new Game(320, 200, 2, 123);

let pauseButton = document.getElementById('pauseButton');
let stepButton = document.getElementById('stepButton');
let FPSSlider = document.getElementById('FPSSlider');
let speedLimitCheckbox = document.getElementById('speedLimitCheckbox');

if (pauseButton) {
    pauseButton.addEventListener( 'click', () => game.togglePause() );
}
if (stepButton) {
    stepButton.addEventListener('click', () => game.stepOnce() );
}
if (FPSSlider) {
    FPSSlider.addEventListener('input', () => game.setFPSLimit(FPSSlider.value));
}
if (speedLimitCheckbox) {
    speedLimitCheckbox.addEventListener(
        'change',
        () => game.toggleSpeedLimit(speedLimitCheckbox.checked)
    );
}
