import React, {Component} from 'react';
import {Game} from './Game.js'

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      game: null,
      gameIsPaused: true,
      gameSpeedLimitIsOn: true,
    };
  }
  
  render(props) {
    return (
      <div className="App">
        <IntroText />
        <div className="container">
          <GameCanvas />
          <GameControls
            gameIsPaused={this.state.gameIsPaused}
            onPauseButtonClick={() => this.handlePauseButtonClick()}
            onStepButtonClick={() => this.state.game.stepOnce()}
            gameSpeedLimitIsOn={this.state.gameSpeedLimitIsOn}
            onSpeedSliderChange={value => this.state.game.setFPSLimit(value)}
            onSpeedLimitButtonClick={() => this.handleLimitChange()}
          />
        </div>
        <div className="container">
          <PlaceHolderContent />
          <PlaceHolderContent />
          <PlaceHolderContent />
        </div>
      </div>
    );
  }

  // game is initialized here because it uses getElementById('gamecanvasdiv')
  // (might want to chage that)
  componentDidMount() {
    let screenWidth = window.screen.availWidth;

    const gameScale = 4; // how many real pixels is one canvas agent/pixel
    const initialAgentCount = 35;
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
    this.setState({gameIsPaused: !this.state.gameIsPaused})
  }
  handleLimitChange() {
    const limit = !this.state.gameSpeedLimitIsOn;
    this.setState({gameSpeedLimitIsOn: limit});
    this.state.game.toggleSpeedLimit(limit);
  }
}

function IntroText() {
  return (
    <div className="solocontainer">
      <div id="introtext">
        <h1>The Walking Johnnie</h1>
        <p>Johnnies are little dark dots.</p>
        <p>They like to move around.</p>
        <p>They leave a colorful trail behind.</p>
      </div>
    </div>
  );
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
          defaultValue="10"
          step="1"
          id="FPSSlider"
          onChange={event => this.props.onSpeedSliderChange(event.target.value)}
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
          {this.props.gameSpeedLimitIsOn ? "Let's go fast" : "Let's slow down"}
        </button>
        </div>
    );
  }
}

function PlaceHolderContent() {
  return (
    <div className="regularsize placeholder container">
      <p>placeholder content</p>
    </div>
  ); 
}

export default App;
