import React, {Component} from 'react';
import {GameComponent} from './components/GameComponent.js';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      page: 1,
    };
  }
  
  render() {
    let page = null;
    if (this.state.page === 1) {
      page = <Page1 />;
    } else if (this.state.page === 2) {
      page = <Page2 />;
    } else if (this.state.page === 3) {
      page = <Page3 />;
    }
    return (
      <div className="App">
        <button 
          onClick={() => this.setState({page:1})}
          style={{ width: 120, height: 65, backgroundColor: "red" }}
        >DEV-test-button page1</button>
        <button 
        onClick={() => this.setState({page:2})}
        style={{ width: 120, height: 65, backgroundColor: "red" }}
        >DEV-test-button page2</button>
        <button 
        onClick={() => this.setState({page:3})}
        style={{ width: 120, height: 65, backgroundColor: "red" }}
        >DEV-test-button page3</button>
        {page}
      </div>
    );
  }
}

function Page1() {
  return(
    <div className="solocontainer">
      <div>
        <IntroText />
        <JohnnieExplanation />
        <GameComponent
          renderXPlot={false}
          renderYPlot={false}
        />
        <Page1EndText />
      </div>
    </div>
  );
}

function Page2() {
  return(
    <div>
      <div>
        <GameComponent 
          renderXPlot={true}
          renderYPlot={false}
          gameAgents={15}
          gameScale={8}
        />
      </div>
      <div className="container">
        <PlaceHolderContent />
      </div>
    </div>
  );
}

function Page3() {
  return(
    <div>
      <div className="container"><p>This is page 3</p></div>
      <div>
        <GameComponent 
          renderXPlot={true}
          renderYPlot={true}
          gameAgents={1500}
          gameScale={4}
        />
      </div>
    </div>
  );
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

function JohnnieExplanation() {
  return (
    <div className="textcontent">
      <p>
        A Walking Johnnie will move either up, down, left or right 
        with an equal one out of four propability for each direction.
      </p>
      <p>
        Below is one randomly moving Johnnie wandering around in a box. 
        Try unpausing him using the speed controls below!
      </p>
    </div>
  );
}

function Page1EndText() {
  return (
    <div className="textcontent">
      <p>
        You might think that the Johnnie would not move far from the center.
        After all, there is an equal chance of moving left and moving right. 
        Surely the dark dot must undo each upward movement with a downward movement, 
        at least on average? 
      </p>
    </div>
  );
}

function PlaceHolderContent() {
  return (
    <div className="regularsize placeholder container">
      <p>placeholder content</p>
    </div>
  ); 
}

export default App;
