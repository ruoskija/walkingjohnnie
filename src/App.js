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
        <button onClick={() => this.setState({page:1})}>dev-test-button page1</button>
        <button onClick={() => this.setState({page:2})}>dev-test-button page2</button>
        <button onClick={() => this.setState({page:3})}>dev-test-button page3</button>
        {page}
      </div>
    );
  }
}

function Page1() {
  return(
    <div>
      <div>
        <IntroText />
        <GameComponent />
      </div>
      <div className="container">
        <PlaceHolderContent />
        <PlaceHolderContent />
        <PlaceHolderContent />
      </div>
    </div>
  );
}

function Page2() {
  return(
    <div>
      <div>
        <GameComponent 
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

function PlaceHolderContent() {
  return (
    <div className="regularsize placeholder container">
      <p>placeholder content</p>
    </div>
  ); 
}

export default App;
