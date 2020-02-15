let canvas;
let context;
let agents;
let paused;
let time;
let limitSpeed;

// change these to customize things
const boxSize        = 2;
const areaWidth      = 320;
const areaHeight     = 200;
const numberOfAgents = 14;
const defaultMaxFPS  = 25;

const origin = {
    x: Math.floor(areaWidth  / 2),
    y: Math.floor(areaHeight / 2)
};
const canvasHeight = boxSize * areaHeight;
const canvasWidth  = boxSize * areaWidth;

class Drawable {
    constructor(x = 0, y = 0, color = '#FFFFFF') {
        this.x = x;
        this.y = y;
        this.color = color;
    }

    draw() {
        if (this.isOutsideOfGameArea()) {
            return;
        }
        context.fillStyle = this.color;
        context.fillRect(this.x * boxSize, this.y * boxSize, boxSize, boxSize);
        return;
    }

    isOutsideOfGameArea() {
        return (this.x < 0          ||
                this.x >= areaWidth ||
                this.y < 0          ||
                this.y >= areaHeight);
    }
}

class Agent extends Drawable {
    constructor(x=0, y=0, color='#070707') {
        super(x, y, color);
        this.residueColor = randomColor();
    }

    step() {
        switch (randN(4)) {
            case 0:
                this.x += 1;
                break;
            case 1:
                this.y += 1;
                break;
            case 2:
                this.y -= 1;
                break;
            default:
                this.x -= 1;
        }
    }
}

class Residue extends Drawable {
    constructor(x=0, y=0, color='#333333') {
        super(x, y, color);
        return;
    }
}

agents     = [];
paused     = true;
limitSpeed = true;

time = {
    now: () => window.performance.now(), // might not work on all browsers
    ofLastUpdate: 0,
    sinceLastUpdate: 0,
    minUpdateInterval: Math.max(1, 1000 / defaultMaxFPS)
};

for(let i = 0; i < numberOfAgents; i++) {
    agents.push(new Agent(origin.x, origin.y));
}

function clearCanvas() {
    context.clearRect(0, 0, canvasWidth, canvasHeight);
    return;
} 
function randN(N) {
    return Math.floor((Math.random() * N));
}

function randomColor() {
    return 'rgb(' + randN(255).toString() + ',' + 
        randN(255).toString() + ',' + 
        randN(255).toString() + ')';
}

function loop() {

    if(limitSpeed) {
        time.sinceLastUpdate = time.now() - time.ofLastUpdate;
        // wait if not enough time has passed
        if (time.sinceLastUpdate < time.minUpdateInterval && !paused) {
            setTimeout(loop, time.minUpdateInterval - time.sinceLastUpdate);
            return;
        }
        time.ofLastUpdate += time.sinceLastUpdate;
    }
    
    agents.forEach(p => {
        let tempResidue = new Residue(p.x, p.y, p.residueColor); 
        tempResidue.draw();
        p.step();
        p.draw();
    });

    if (!paused) {
        window.requestAnimationFrame(loop);
    }
    return;
}

function initGame(c) {
    canvas = c;
    canvas.width = canvasWidth;
    canvas.height = canvasHeight;
    context = canvas.getContext('2d');

    paused = true;
    return;
}

function togglePause() {
    paused = !paused;
    if (!paused) {
        window.requestAnimationFrame(loop);
    }
    return;
}

function stepOnce() {
    if (paused) {
        window.requestAnimationFrame(loop);
    }
    return;
}

function setFPSLimit(fps) {
    if (!fps) {
        return;
    }
    if (fps < 1) {
        fps = 1;
    } else if (fps > 30) {
        fps = 30;
    }

    time.minUpdateInterval = 1000 / fps;
}

function toggleSpeedLimit(limit) {
    limitSpeed = limit;
}

export { initGame, togglePause, stepOnce, setFPSLimit, toggleSpeedLimit };
