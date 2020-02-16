import * as distancePlot from './distanceplot.js';
import * as gameCanvas   from './gamecanvas.js';
import { Timer }         from './timer.js';
import { World }         from './world.js';

let world;
let paused;
let speedLimitTimer;
let limitSpeed;

// change these to customize things
const boxSize        = 2;
const areaWidth      = 320;
const areaHeight     = 200;
const numberOfAgents = 123;
const defaultMaxFPS  = 25;

function loop() {

    if(limitSpeed) {
        let timeLeft = speedLimitTimer.remaining();
        if (timeLeft > 0 && !paused) {
            setTimeout(loop, timeLeft);
            return;
        }
    }
    
    world.agents.forEach(agent => {

        // draw agents trailColor to current position
        if (agent.isInsideArea(world.width, world.height)) {
            gameCanvas.draw(agent.x, agent.y, agent.trailColor);
        }

        // move agents
        agent.step();

        // draw dark square to new position
        if (agent.isInsideArea(world.width, world.height)) {
            gameCanvas.draw(agent.x, agent.y, agent.color);
        }
        
    });

    world.updateDistances();
    distancePlot.update(world.distanceCounter, world.maxDistance);

    if (!paused) {
        window.requestAnimationFrame(loop);
    }
    return;
}

function initGame(c) {
    gameCanvas.create(areaWidth, areaHeight, boxSize);
    distancePlot.init(numberOfAgents);
    
    paused     = true;
    limitSpeed = true;
    speedLimitTimer = new Timer(1000 / defaultMaxFPS);
    
    world = new World(areaWidth, areaHeight);
    for (let i = 0; i < numberOfAgents; i++) {
        world.spawnAgent();
    }
    
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
