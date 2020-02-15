import * as helpers      from './helpers.js';
import * as distancePlot from './distanceplot.js';
import * as gameCanvas   from './gamecanvas.js';
import { Timer }         from './timer.js';

let agents;
let distances;
let paused;
let speedLimitTimer;
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

class Agent {
    constructor(x=0, y=0, trailColor='#609609', color='#070707') {
        this.x = x;
        this.y = y;
        this.color = color;
        this.trailColor = trailColor;
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

    isOutsideGameArea() {
        return (this.x < 0          ||
                this.x >= areaWidth ||
                this.y < 0          ||
                this.y >= areaHeight);
    }

    isInsideGameArea() {
        return !this.isOutsideGameArea();
    }
}

function createAgents(amout) {
    const newAgents = [];
    for(let i = 0; i < amout; i++) {
        newAgents.push(
            new Agent(
                origin.x,
                origin.y,
                helpers.randomColor()
            )
        );
    }
    return newAgents;
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
        let timeLeft = speedLimitTimer.remaining();
        if (timeLeft > 0 && !paused) {
            setTimeout(loop, timeLeft);
            return;
        }
    }
    
    agents.forEach(agent => {
        // draw agents trailColor to current position
        if (agent.isInsideGameArea()) {
            gameCanvas.draw(agent.x, agent.y, agent.trailColor);
        }

        // move
        agent.step();

        // draw dark square to new position
        if (agent.isInsideGameArea()) {
            gameCanvas.draw(agent.x, agent.y, agent.color);
        }
    });

    updateDistances();

    if (!paused) {
        window.requestAnimationFrame(loop);
    }
    return;
}

function initGame(c) {
    gameCanvas.create(areaWidth, areaHeight, boxSize);
    distancePlot.init(numberOfAgents);
    agents = createAgents(numberOfAgents);
    
    distances  = [];
    paused     = true;
    limitSpeed = true;
    speedLimitTimer = new Timer(1000 / defaultMaxFPS);
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

    speedLimitTimer.interval = 1000 / fps;
}

function toggleSpeedLimit(limit) {
    limitSpeed = limit;
}

export { initGame, togglePause, stepOnce, setFPSLimit, toggleSpeedLimit };
