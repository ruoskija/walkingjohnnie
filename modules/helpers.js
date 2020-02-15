
function randN(N) {
    return Math.floor((Math.random() * N));
}

function randomColor() {
    return 'rgb(' + randN(255).toString() + ',' +
        randN(255).toString() + ',' +
        randN(255).toString() + ')';
}

function distanceBetweenTwoPoints(xOfPointA, yOfPointA, xOfPointB, yOfPointB) {
    let xDiff = xOfPointA - xOfPointB;
    let yDiff = yOfPointA - yOfPointB;
    return Math.floor(Math.sqrt( xDiff * xDiff + yDiff * yDiff ));
}

export { randN, randomColor, distanceBetweenTwoPoints };