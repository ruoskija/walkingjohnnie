import React, { Component } from 'react';

class GameControls extends Component {
  render() {
    const StepButton = this.props.gameIsPaused ? this.renderStepButton() : null;
    const PauseButton = this.renderPauseButton();
    const SpeedSlider = this.renderSpeedSlider();
    const speedLimitButton = this.renderSpeedLimitButton();
    return (
      <div id="gamecontrols" className="container">
        <div className="container">
          <p style={{ margin: "0px", textShadow: "1px 1px grey" }}>Speed Controls</p>
        </div>
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
        onClick={() => this.props.onPauseButtonClick()}
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
    return (
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

export { GameControls };
