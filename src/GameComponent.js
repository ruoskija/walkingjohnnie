import React, {Component} from 'react';
import {Game} from './walkergame/Game.js';

export class GameComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      game: null,
      gameIsPaused: true,
      gameSpeedLimitIsOn: true,
      gameFPS: 10,
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
            onPauseButtonClick={() => this.handlePauseButtonClick()}
            onStepButtonClick={() => this.state.game.stepOnce()}
            onFPSChange={value => this.handleFPSChange(value)}
            onSpeedLimitButtonClick={() => this.handleLimitChange()}
          />
        </div>
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
  
  handlePauseButtonClick() {
    this.state.game.togglePause();
    this.setState(
      {
        gameIsPaused: !this.state.gameIsPaused,
      }
    )
  }

  handleLimitChange() {
    const limit = !this.state.gameSpeedLimitIsOn;
    this.setState(
      {
        gameSpeedLimitIsOn: limit,
      }
    );
    this.state.game.toggleSpeedLimit(limit);
  }

  handleFPSChange(newValue) {
    if (newValue < 0 || newValue > 60) {
      return;
    }
    this.state.game.setFPS(newValue);
    this.setState(
      {
        gameFPS: Math.floor(newValue),
      }
    );
  }
}

  
function GameCanvas() {
  return <div id="gamecanvasdiv"/>;
}
  
class GameControls extends Component {
  render() {
    const StepButton = this.props.gameIsPaused ? this.renderStepButton() : null;
    const PauseButton = this.renderPauseButton();
    const SpeedSlider = this.renderSpeedSlider();
    const speedLimitButton = this.renderSpeedLimitButton();
    return (
      <div id="gamecontrols">
        <div>
          {PauseButton}
          {StepButton}
        </div>
        {SpeedSlider}
        {speedLimitButton}
      </div>
    );
  }
    
  renderPauseButton() {
    return (
      <button 
        id="pauseButton"
        onClick={ () => this.props.onPauseButtonClick() }
      >
        {this.props.gameIsPaused ? "Resume" : "Pause"}
      </button>
    );
  }
  
  renderStepButton() {
      return (
        <button 
          id="stepButton"
          onClick={() => this.props.onStepButtonClick()}
        >
          Step
        </button>
      );
  }
  
  renderSpeedSlider() {
    return (
      <div className="container">
        <input
          type="range"
          min="1"
          max="30"
          value={this.props.gameSpeedLimitIsOn ? this.props.gameFPS : 30}
          step="1"
          id="FPSSlider"
          onChange={event => this.props.onFPSChange(event.target.value)}
        />
        <label htmlFor="FPSSlider">
          Speed
        </label>
      </div>
    );
  }
  
  renderSpeedLimitButton() {
    return(
      <div>
        <button
          onClick={() => this.props.onSpeedLimitButtonClick()}
        >
          {this.props.gameSpeedLimitIsOn ? " Switch to turbo speed" : "Switch to normal speed"}
        </button>
      </div>
    );
  }
}