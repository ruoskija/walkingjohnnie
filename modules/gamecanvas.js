let canvas;
let context;
let boxSize;

/**
 * Creates a canvas element to the div 'gamecanvasdiv'.
 * @param {number} width width of the canvas element
 * @param {number} height height of the canvas element
 * @param {number} drawnSquareSize size of the squares drawn to the canvas (in pixels)  
 */
function create(width=640, height=400, drawnSquareSize=2) {
    canvas = document.createElement('canvas');
    canvas.width = width * drawnSquareSize;
    canvas.height = height * drawnSquareSize;
    canvas.id = 'game';
    document.getElementById('gamecanvasdiv').appendChild(canvas);
    context = canvas.getContext('2d');
    boxSize = drawnSquareSize;
    return;
}

/**
 * Clears the canvas completely
 */
function clearAll() {
    context.clearRect(0, 0, canvas.width, canvas.height);
    return;
}

/**
 * Draw a square to the canvas
 * @param {number} x x coordinate
 * @param {number} y y coordinate
 * @param {string} color color of the square
 */
function draw(x, y, color) {
    context.fillStyle = color;
    context.fillRect(x * boxSize, y * boxSize, boxSize, boxSize);
    return;
}

export { create, clearAll, draw };