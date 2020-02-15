class Timer {
    constructor(interval=15) {
        this.lastResetTime = 0;
        this.interval = interval;
    }

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