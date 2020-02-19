import { Game } from './modules/game.js';

let screenWidth  = window.screen.availWidth;
//let screenheight = window.screen.availHeight;
let game;
if (screenWidth < 640) {
    game = new Game(Math.floor(screenWidth / 2) - 1, Math.floor(3 * screenWidth / 8), 2, 99);    
} else {
    game = new Game(320, 200, 2, 99);
}


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
