import { randN } from './helpers.js';

class Agent {
    constructor(x=0, y=0, trailColor='#609609', color='#070707') {
        this.x = x;
        this.y = y;
        this.color = color;
        this.trailColor = trailColor;
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

    isOutsideArea(areaWidth, areaHeight) {
        return (this.x < 0          ||
                this.x >= areaWidth ||
                this.y < 0          ||
                this.y >= areaHeight);
    }

    isInsideArea(areaWidth, areaHeight) {
        return !this.isOutsideArea(areaWidth, areaHeight);
    }
}

export { Agent };