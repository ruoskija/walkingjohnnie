/**
 * Returns a random integer from range {0,N}
 * @param {number} N Maximum random integer, N > 0
 * @return {number}
 */
function randN(N) {
    return Math.floor((Math.random() * N));
}

/**
 * Returns a css color string representing a random color
 * @return {string} css rgb color string
 */
function randomColor() {
    return 'rgb(' + randN(255).toString() + ',' +
        randN(255).toString() + ',' +
        randN(255).toString() + ')';
}

/**
 * Calculates the distance between two points floored to the neares integer
 * @param {number} xOfPointA x coordinate of point A
 * @param {number} yOfPointA y coordinate of point A
 * @param {number} xOfPointB x coordinate of point B
 * @param {number} yOfPointB y coordiante of point B
 * @return {number}
 */
function distanceBetweenTwoPoints(xOfPointA, yOfPointA, xOfPointB, yOfPointB) {
    let xDiff = xOfPointA - xOfPointB;
    let yDiff = yOfPointA - yOfPointB;
    return Math.floor(Math.sqrt( xDiff * xDiff + yDiff * yDiff ));
}

export { randN, randomColor, distanceBetweenTwoPoints };