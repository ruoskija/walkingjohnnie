import { randomColor, distanceBetweenTwoPoints } from './helpers.js';
import { Agent }       from './agent.js';

class World {
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

    spawnAgent() {
        this.agents.push(
            new Agent(this.origin.x, this.origin.y, randomColor())
        );
    }

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