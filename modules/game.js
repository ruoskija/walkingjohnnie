import * as distancePlot from './distanceplot.js';
import * as gameCanvas   from './gamecanvas.js';
import { Timer }         from './timer.js';
import { World }         from './world.js';

/** A class for running an animation of walking Johhnies */
class Game {
    /**
     * Creates an instance of Game
     * @param {number} width - width of the game area
     * @param {number} height - height of the game area
     * @param {number} squareSize - the size of drawn squares in pixels
     * @param {number} numberOfAgents - number of moving characters in the game
     */
    constructor(width, height, squareSize, numberOfAgents) {
        this.areaWidth      = width;
        this.areaHeight     = height;
        this.boxSize        = squareSize;
        this.numberOfAgents = numberOfAgents;

        this.loopInterval  = 1000 / 25;
        this.paused        = true;
        this.limitSpeed    = true;

        this.distancePlotTimer = new Timer();
        this.speedLimitTimer   = new Timer();
        this.world             = new World(width, height);

        gameCanvas.create(width, height, squareSize);
        distancePlot.init(numberOfAgents);

        for (let i = 0; i < numberOfAgents; i++) {
            this.world.spawnAgent();
        }
    }

    /**
     * The main loop.
     * Ticks the world once and draws things in it.
     */
    loop() {

        if (this.limitSpeed) {
            if (this.speedLimitTimer.hasFinished()) {
                this.speedLimitTimer.start(this.loopInterval);
            } else if (!this.paused){
                setTimeout( () => this.loop(), 5);
                return;
            }
        }

        this.world.agents.forEach(agent => {
            // draw agents trailColor to current position
            if (agent.isInsideArea(this.world.width, this.world.height)) {
                gameCanvas.draw(agent.x, agent.y, agent.trailColor);
            }

            // move agents
            agent.step();

            // draw dark square to new position
            if (agent.isInsideArea(this.world.width, this.world.height)) {
                gameCanvas.draw(agent.x, agent.y, agent.color);
            }
        });

        if (this.distancePlotTimer.hasFinished() || this.paused) {
            let distances = this.world.getAgentDistances();
            distancePlot.update(distances);
            this.distancePlotTimer.start(1000);
        }

        if (!this.paused) {
            window.requestAnimationFrame( () => this.loop() );
        }
        return;
    }

    /** Puts the game on pause if its running and running if its paused */
    togglePause() {
        this.paused = !this.paused;
        this.distancePlotTimer.forceToFinish();
        if (!this.paused) {
            window.requestAnimationFrame( () => this.loop() );
        }
        return;
    }

    /** Runs the game for a single tick if the game is paused */
    stepOnce() {
        if (this.paused) {
            this.speedLimitTimer.forceToFinish();
            this.distancePlotTimer.forceToFinish();
            window.requestAnimationFrame( () => this.loop() );
        }
        return;
    }

    /** Set the speed of the game by adjusting the refresh rate */
    setFPSLimit(fps) {
        if (!fps) {
            return;
        }
        if (fps < 1) {
            fps = 1;
        } else if (fps > 30) {
            fps = 30;
        }

        this.speedLimitTimer.forceToFinish();
        this.distancePlotTimer.forceToFinish();

        this.loopInterval = 1000 / fps;
        return;
    }

    /**
     * Turn on or off the games speed limit, off targets 60fps
     * @param {boolean} limit true to limit game speed, false for 60fps
     */
    toggleSpeedLimit(limit) {
        this.limitSpeed = limit;

        this.speedLimitTimer.forceToFinish();
        this.distancePlotTimer.forceToFinish();

        return;
    }

}

export { Game };
