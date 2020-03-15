import React from 'react';

function GameControls(props) {
  return(
      <div id="gamecontrols" className="container">
        <div className="container">
          <p style={{ margin: "0px", textShadow: "1px 1px grey" }}>Speed Controls</p>
        </div>
        <div>
          <PauseButton 
            onPauseButtonClick={props.onPauseButtonClick}
            gameIsPaused={props.gameIsPaused}
          />
          <StepButton 
            onStepButtonClick={props.onStepButtonClick}
            gameIsPaused={props.gameIsPaused}
          />
        </div>
        <SpeedSlider
          gameFPS={props.gameFPS}
          gameSpeedLimitIsOn={props.gameSpeedLimitIsOn}
          onFPSChange={props.onFPSChange}
        />
        <SpeedLimitButton 
          gameSpeedLimitIsOn={props.gameSpeedLimitIsOn}
          onSpeedLimitButtonClick={props.onSpeedLimitButtonClick}
        />
      </div>
  );
}

function PauseButton(props) {
  return (
    <button
      id="pauseButton"
      onClick={props.onPauseButtonClick}
    >
      {props.gameIsPaused ? "Resume" : "Pause"}
    </button>
  );
}

function StepButton(props) {
  return (
    <button
      id="stepButton"
      onClick={props.onStepButtonClick}
    >
      Step
    </button>
  );
}

function SpeedSlider(props) {
  return (
    <div className="container">
      <input
        type="range"
        min="1"
        max="30"
        value={props.gameSpeedLimitIsOn ? props.gameFPS : 30}
        step="1"
        id="FPSSlider"
        onChange={event => props.onFPSChange(event.target.value)}
      />
      <label htmlFor="FPSSlider">Speed</label>
    </div>
  );
}

function SpeedLimitButton(props) {
  return (
    <div>
      <button
        onClick={props.onSpeedLimitButtonClick}
      >
        {props.gameSpeedLimitIsOn ? " Switch to turbo speed" : "Switch to normal speed"}
      </button>
    </div>
  );
}

export { GameControls };
