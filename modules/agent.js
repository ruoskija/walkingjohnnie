import { randN, distanceBetweenTwoPoints } from './helpers.js';

/** Class representing an agent. */
class Agent {
    /**
     * Creates an agent.
     * @param {number} x - starting x coordinate 
     * @param {number} y - starting y coordinate
     * @param {string} trailColor - css color of the trail the agent leaves behind
     * @param {string} color - css color of the agent
     */
    constructor(x=0, y=0, trailColor='#609609', color='#070707') {
        this.x = x;
        this.y = y;
        this.color = color;
        this.trailColor = trailColor;
    }

    /** Randomly moves the agent to a neighbor coordinate */
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

    /**
     * Check if the agent is outside a given area. 
     * The area starts from coordinates (0, 0).
     * @param {number} areaWidth 
     * @param {number} areaHeight 
     * @return {boolean} - true if agent is outside of the given area
     */
    isOutsideArea(areaWidth, areaHeight) {
        return (this.x < 0          ||
                this.x >= areaWidth ||
                this.y < 0          ||
                this.y >= areaHeight);
    }
    
    /**
     * Check if the agent is inside a given area. 
     * The area starts from coordinates (0, 0).
     * @param {number} areaWidth 
     * @param {number} areaHeight 
     * @return {boolean} - true if agent is inside of the given area
     */
    isInsideArea(areaWidth, areaHeight) {
        return !this.isOutsideArea(areaWidth, areaHeight);
    }

    /**
     * Calculate the agents distance from a point (x, y)
     * @param {number} x x coordinate of a point
     * @param {number} y y coordinate of a point
     * @return {number} the agents distance from the point
     */
    distanceFrom(x, y) {
        return distanceBetweenTwoPoints(this.x, this.y, x, y);
    }
}

export { Agent };