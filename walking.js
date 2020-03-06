import { Game } from './modules/game.js';

let screenWidth = window.screen.availWidth;

const gameScale = 4; // how many real pixels is one canvas agent/pixel
const initialAgentCount = 35;
const maxCanvasWidth = 640;

const canvasWidth  = screenWidth < maxCanvasWidth ? screenWidth : maxCanvasWidth;
const canvasHeight = Math.floor((5/8) * canvasWidth); // 8:5 aspect ratio
const gameWidth  = Math.floor(canvasWidth  / gameScale);
const gameHeight = Math.floor(canvasHeight / gameScale);

let game = new Game(gameWidth, gameHeight, gameScale, initialAgentCount);

let pauseButton        = document.getElementById('pauseButton');
let stepButton         = document.getElementById('stepButton');
let FPSSlider          = document.getElementById('FPSSlider');
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
