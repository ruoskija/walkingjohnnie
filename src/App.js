import React, {Component} from 'react';
import {Game} from './Game.js'

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      game: null,
    };
  }
  
  render() {
    return (
      <div className="App">
        <IntroText />
        <div className="container">
          <GameCanvas />
          <GameControls />
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
    myGame.togglePause();
    myGame.limitSpeed = false;
    this.setState({
      game: myGame,
    });
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
    return (
      <div id="gamecontrols">
        <div>
          <button id="pauseButton">Toggle Pause</button>
          <button id="stepButton">Step</button>
        </div>
        <div className="container">
          <input type="range" min="1" max="30" defaultValue="25" step="1" id="FPSSlider" />
          <label for="FPSSlider">Speed</label> <br />
        </div>
        <div>
          <input type="checkbox" id="speedLimitCheckbox" checked />
          <label for="speedLimitCheckbox">Limit speed</label>
        </div>
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
