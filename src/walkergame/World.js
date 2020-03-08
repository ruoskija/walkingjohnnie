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
     * Returns an array of the distances the agents have from the origin.
     * @return {Array.<number>} array of distances from origin
     */
    getAgentDistances() {
        let distances = [];
        this.agents.forEach(agent => {
            distances.push(agent.distanceFrom(this.origin.x, this.origin.y));
        });
        return distances;
    }
}

export { World };