
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
 * @param {Map} counter A map: key is distance, value is the number of agents 
 * @param {number} maxDistance The furthest any agent has ever moved
 */
function update(counter, maxDistance) {
    let xs = [];
    let ys = [];

    for (let i = 0; i <= maxDistance; i++) {
        xs.push(i);
        let count = counter.has(i) ? counter.get(i) : 0;
        ys.push(count);
    }

    Plotly.restyle( 'distancesPlot', 'x', [xs]);
    Plotly.restyle( 'distancesPlot', 'y', [ys]);
    return;
}

export { init, update };