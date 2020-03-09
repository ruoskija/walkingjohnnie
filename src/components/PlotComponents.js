import React from 'react';
import Plotly from 'plotly.js-basic-dist';
import PropTypes from 'prop-types';

import createPlotlyComponent from "react-plotly.js/factory";
const Plot = createPlotlyComponent(Plotly);

function XPositionsPlot(props) {
  return (
    <Plot
      data={[{
        x: props.xPlotXs,
        y: props.xPlotYs,
        marker: {
          color: 'rgb(24,29,44)'
        },
        type: 'bar'
      }]}
      layout={{
        title: {
          text: 'Distribution of Johnnies\' x-axis positions',
          font: {
            size: 12
          }
        },
        xaxis: {
          title: {
            text: 'position',
            font: {
              size: 12
            }
          }
        },
        yaxis: {
          title: {
            text: 'number of Johnnies',
            font: {
              size: 12
            }

          }
        },
        bargap: 0
      }}
    />
  );
}

XPositionsPlot.propTypes = {
  xPlotXs: PropTypes.arrayOf(PropTypes.number).isRequired,
  xPlotYs: PropTypes.arrayOf(PropTypes.number).isRequired,
}

function YPositionsPlot(props) {
  return (
    <Plot
      data={[{
        x: props.yPlotXs,
        y: props.yPlotYs,
        marker: {
          color: 'rgb(24,29,44)'
        },
        type: 'bar',
        orientation: 'h',
      }]}
      layout={{
        title: {
          text: 'Distribution of Johnnies\' y-axis positions',
          font: {
            size: 12
          }
        },
        xaxis: {
          title: {
            text: 'number of Johnnies',
            font: {
              size: 12
            }
          }
        },
        yaxis: {
          title: {
            text: 'position',
            font: {
              size: 12
            }

          }
        },
        bargap: 0
      }}
    />
  );
}

YPositionsPlot.propTypes = {
  yPlotXs: PropTypes.arrayOf(PropTypes.number).isRequired,
  yPlotYs: PropTypes.arrayOf(PropTypes.number).isRequired,
}

export {YPositionsPlot, XPositionsPlot};
