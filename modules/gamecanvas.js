let canvas;
let context;

function create(width=640, height=400) {
    canvas = document.createElement('canvas');
    canvas.width = width;
    canvas.height = height;
    canvas.id = 'game';
    document.getElementById('gamediv').appendChild(canvas);
    context = canvas.getContext('2d');
    return;
}

function clearAll() {
    context.clearRect(0, 0, canvas.width, canvas.height);
    return;
}

function draw(x, y, boxSize, color) {
    context.fillStyle = color;
    context.fillRect(x * boxSize, y * boxSize, boxSize, boxSize);
    return;
}

export { create, clearAll, draw };