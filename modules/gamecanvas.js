let canvas;
let context;
let boxSize;

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

function clearAll() {
    context.clearRect(0, 0, canvas.width, canvas.height);
    return;
}

function draw(x, y, color) {
    context.fillStyle = color;
    context.fillRect(x * boxSize, y * boxSize, boxSize, boxSize);
    return;
}

export { create, clearAll, draw };