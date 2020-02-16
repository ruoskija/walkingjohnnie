
/**
 * Initializes the div 'distancePlot' with a Plot.ly plot
 * @param {number} numberOfAgents 
 */
function init(numberOfAgents) {
    Plotly.newPlot( 'distancesPlot',
        [{
            x: [0],
            y: [numberOfAgents],
            marker: {
                color: 'rgb(24,29,44)'
            },
            type: 'bar'
        }],
        {
            title: {
                text: 'Distribution of how far the walking Johnnies are from home'
            },
            xaxis: {
                title: 'distance'
            },
            yaxis: {
                title: 'number of Johnnies'
            },
            bargap: 0
        });
    return;
}

/**
 * Updates the distance plot with new distances.
 * @param {Array.<number>} distances distances to plot
 */
function update(distances) {

    let countMap = new Map();
    let maxDistance = 1;
    for (let distance of distances) {
        if (distance > maxDistance) {
            maxDistance = distance;
        }

        if (countMap.has(distance)) {
            countMap.set(distance, countMap.get(distance) + 1);
        } else {
            countMap.set(distance, 1);
        }
    }

    let xs = [];
    let ys = [];

    for (let i = 0; i <= maxDistance; i++) {
        xs.push(i);
        let count = countMap.has(i) ? countMap.get(i) : 0;
        ys.push(count);
    }

    Plotly.restyle( 'distancesPlot', 'x', [xs]);
    Plotly.restyle( 'distancesPlot', 'y', [ys]);
    return;
}

export { init, update };