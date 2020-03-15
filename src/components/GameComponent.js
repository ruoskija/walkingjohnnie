import React, {Component} from 'react';
import {Game} from '../walkergame/Game.js';
import {GameControls} from './GameControls.js';
import {XPositionsPlot, YPositionsPlot} from './PlotComponents.js';

export class GameComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      game: null,
      gameIsPaused: true,
      gameSpeedLimitIsOn: true,
      gameFPS: 10,
      xPlotXs: [0],
      xPlotYs: [1],
      yPlotXs: [1],
      yPlotYs: [0],
    };
  }
    
  render() {
    return (
      <div>
        <div className="container">
          <GameCanvas />
          <GameControls
            gameIsPaused={this.state.gameIsPaused}
            gameSpeedLimitIsOn={this.state.gameSpeedLimitIsOn}
            gameFPS={this.state.gameFPS}
            onPauseButtonClick={() => this.togglePause()}
            onStepButtonClick={() => this.state.game.stepOnce()}
            onFPSChange={value => this.changeFPS(value)}
            onSpeedLimitButtonClick={() => this.changeSpeedLimiter()}
          />
        </div>
        <Plots 
          refreshPlots={() => this.refreshPlots()}
          xPlotXs={this.state.xPlotXs}
          xPlotYs={this.state.xPlotYs}
          yPlotXs={this.state.yPlotXs}
          yPlotYs={this.state.yPlotYs}
          renderXPlot={this.props.renderXPlot}
          renderYPlot={this.props.renderYPlot}
        />
      </div>
    );
  }
  
  // game is initialized here because it uses getElementById('gamecanvasdiv')
  // (might want to chage that later...)
  componentDidMount() {
    let screenWidth = window.screen.availWidth;
  
    // how many real pixels is the size of one agent/canvas-pixel
    const gameScale = this.props.gameScale ? this.props.gameScale : 4;

    // how many agents spawn when the game starts
    const initialAgentCount = this.props.gameAgents ? this.props.gameAgents : 1;
    
    const maxCanvasWidth = 640;
    const canvasWidth  = screenWidth < maxCanvasWidth ? screenWidth : maxCanvasWidth;
    const canvasHeight = Math.floor((5/8) * canvasWidth); // 8:5 aspect ratio
    const gameWidth  = Math.floor(canvasWidth  / gameScale);
    const gameHeight = Math.floor(canvasHeight / gameScale);
  
    const myGame = new Game(gameWidth, gameHeight, gameScale, initialAgentCount);
    this.setState({
      game: myGame,
    });
  }
  
  togglePause() {
    this.state.game.togglePause();
    this.setState(
      {
        gameIsPaused: !this.state.gameIsPaused,
      }
    )
  }

  changeSpeedLimiter() {
    const limit = !this.state.gameSpeedLimitIsOn;
    this.setState(
      {
        gameSpeedLimitIsOn: limit,
      }
    );
    this.state.game.toggleSpeedLimit(limit);
  }

  changeFPS(newValue) {
    newValue = Math.floor(newValue)
    if (newValue < 0 || newValue > 60) {
      return;
    }
    this.state.game.setFPS(newValue);
    this.setState(
      {
        gameFPS: newValue,
      }
    );
  }

  refreshPlots() {
    this.refreshXPlot();
    this.refreshYPlot();
  }

  refreshXPlot() {
    let countMap = new Map();
    let max = 0;
    let min = 0;
    const positions = this.state.game.getAgentXs();
    for (const val of positions) {
      if (val > max) {
        max = val;
      }
      if (val < min) {
        min = val;
      }

      if (countMap.has(val)) {
        countMap.set(val, countMap.get(val) + 1);
      } else {
        countMap.set(val, 1);
      }
    }

    const top = max > -min ? max : -min;
    let vals   = [];
    let counts = [];
    for (let i = -top; i <= top; i++) {
      vals.push(i);
      const count = countMap.has(i) ? countMap.get(i) : 0;
      counts.push(count);
    }

    this.setState({
      xPlotXs: vals,
      xPlotYs: counts,
    });
  }

  refreshYPlot() {
    let countMap = new Map();
    let max = 0;
    let min = 0;
    const positions = this.state.game.getAgentYs();
    for (const val of positions) {
      if (val > max) {
        max = val;
      }
      if (val < min) {
        min = val;
      }

      if (countMap.has(val)) {
        countMap.set(val, countMap.get(val) + 1);
      } else {
        countMap.set(val, 1);
      }
    }

    const top = max > -min ? max : -min;
    let vals   = [];
    let counts = [];
    for (let i = -top; i <= top; i++) {
      vals.push(i);
      const count = countMap.has(i) ? countMap.get(i) : 0;
      counts.push(count);
    }

    this.setState({
      yPlotXs: counts,
      yPlotYs: vals,
    });
  }

}

function Plots(props) {
  const renderXPlot = props.renderXPlot;
  const renderYPlot = props.renderYPlot;

  return (
    <div className="container">
      <button
        onClick={() => props.refreshPlots()}
        style={{ width: 120, height: 65, backgroundColor: "red" }}
      >DEV-refresh-plot</button>
      {renderXPlot && <XPositionsPlot
        xPlotXs={props.xPlotXs}
        xPlotYs={props.xPlotYs}
      />}
      {renderYPlot && <YPositionsPlot
        yPlotXs={props.yPlotXs}
        yPlotYs={props.yPlotYs}

      />}
    </div>
  );
}

function GameCanvas() {
  return <div id="gamecanvasdiv"/>;
}
