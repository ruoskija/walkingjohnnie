/** Class for tracking if enough time has passed since last checked */
class Timer {
    /**
     * Creates a Timer.
     * @param {number} interval how much time must pass (milliseconds)
     */
    constructor(interval=15) {
        this.lastResetTime = 0;
        this.interval = interval;
    }

    /**
     * Returns how long until 'interval' amount of time has passed 
     * @return {number} the time remaining in the timer
     */
    remaining() {
        let currentTime = window.performance.now(); // might not work on all browsers
        if (currentTime > this.lastResetTime + this.interval) {
            this.lastResetTime = currentTime;
            return 0;
        } else {
            return currentTime - this.lastResetTime;
        }
    }
}

export { Timer };