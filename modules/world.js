import { randomColor, distanceBetweenTwoPoints } from './helpers.js';
import { Agent }       from './agent.js';

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

    /**
     * Spawns a new agent to the middle of the world.
     */
    spawnAgent() {
        this.agents.push(
            new Agent(this.origin.x, this.origin.y, randomColor())
        );
    }

    /**
     * Updates maxDistance and distanceCounter with 
     * the up to date agent distances.
     */
    updateDistances() {
        let nextDistanceCounter = new Map();
        for (let agent of this.agents) {

            let distance = distanceBetweenTwoPoints(
                this.origin.x,
                this.origin.y,
                agent.x,
                agent.y);

            if (distance > this.maxDistance) {
                this.maxDistance = distance;
            }

            if (nextDistanceCounter.has(distance)) {
                nextDistanceCounter.set(distance, nextDistanceCounter.get(distance) + 1);
            } else {
                nextDistanceCounter.set(distance, 1);
            }
        }

        this.distanceCounter = nextDistanceCounter;
        return;
    }


}

export { World };