/** Class for tracking time */
class Timer {
    /** Creates a Timer. */
    constructor() {
        this.finished = true;
        this.timer = setTimeout( () => {}, 1);
    }

    /**
     * Sets the remaining time and starts the timer.
     * @param {number} milliseconds 
     */
    start(milliseconds) {
        this.finished = false;
        this.timer = setTimeout( () => this.finished = true, milliseconds);
        return;
    }

    /** Returns true if the timer has reached zero. */
    hasFinished() {
        return this.finished;
    }

    /** forces the timer to zero */
    forceToFinish() {
        clearTimeout(this.timer);
        this.finished = true;
        return;
    }
}

export { Timer };