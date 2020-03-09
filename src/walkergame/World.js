import { randomColor } from './helpers.js';
import { Agent }       from './Agent.js';

/**
 * A world is a 2d plane where Agents move around
 */
class World {
    /**
     * Creates a world.
     * @param {number} width 
     * @param {number} height 
     */
    constructor(width, height) {
        this.width = width;
        this.height = height;
        this.agents = [];
        this.distanceCounter = new Map();
        this.maxDistance = 1;
        this.origin = {
            x: Math.floor(width  / 2),
            y: Math.floor(height / 2)
        };
    }

    /** Creates a new Agent to the middle of the world. */
    spawnAgent() {
        this.agents.push(
            new Agent(this.origin.x, this.origin.y, randomColor())
        );
    }

    /** 
     * Returns an array of the x positions of the agents.
     * @return {Array.<number>} array of x positions
     */
    getAgentXs() {
        let xs = [];
        this.agents.forEach(agent => {
            xs.push(agent.x - this.origin.x);
        });
        return xs;
    }

    /** 
     * Returns an array of the y positions of the agents.
     * @return {Array.<number>} array of y positions
     */
    getAgentYs() {
        let ys = [];
        this.agents.forEach(agent => {
            ys.push(agent.y - this.origin.y);
        });
        return ys;
    }
}

export { World };