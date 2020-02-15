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