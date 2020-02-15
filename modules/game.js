import * as helpers      from './helpers.js';
import * as distancePlot from './distanceplot.js';
import * as gameCanvas   from './gamecanvas.js';

let agents;
let distances;
let paused;
let time;
let limitSpeed;

// change these to customize things
const boxSize        = 2;
const areaWidth      = 320;
const areaHeight     = 200;
const numberOfAgents = 123;
const defaultMaxFPS  = 25;

const origin = {
    x: Math.floor(areaWidth  / 2),
    y: Math.floor(areaHeight / 2)
};

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
        gameCanvas.draw(this.x, this.y, boxSize, this.color);
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
        this.residueColor = helpers.randomColor();
    }

    step() {
        switch (helpers.randN(4)) {
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

agents     = [];
distances  = [];
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

function updateDistances() {
    distances = [];
    let distanceCounter = new Map();
    let maxDistance = 1;
    for (let agent of agents) {
        let distance = helpers.distanceBetweenTwoPoints(
            origin.x,
            origin.y,
            agent.x,
            agent.y);
        distances.push(distance);
        if (distance > maxDistance) {
            maxDistance = distance;
        }
        if (distanceCounter.has(distance)) {
            distanceCounter.set(distance, distanceCounter.get(distance) + 1);
        } else {
            distanceCounter.set(distance, 1);
        }
    }

    distancePlot.update(distanceCounter, maxDistance);
    return;
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
        let tempResidue = new Drawable(p.x, p.y, p.residueColor);
        tempResidue.draw();
        p.step();
        p.draw();
    });

    updateDistances();

    if (!paused) {
        window.requestAnimationFrame(loop);
    }
    return;
}

function initGame(c) {
    gameCanvas.create(boxSize * areaWidth, boxSize * areaHeight);
    paused = true;
    distancePlot.init(numberOfAgents);
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
