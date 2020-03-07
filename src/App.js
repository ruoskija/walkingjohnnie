import React, {Component} from 'react';

class App extends Component {
  //constructor(props) {
  //  super(props)
  //}
  
  render() {
    return (
      <div className="App">
        <IntroText />  
      </div>
    );
  }
  
}

function IntroText() {
  return (
    <div className="solocontainer">
      <div id="introtext">
        <h1>The Walking Johnnie</h1>
        <p>Johnnies are little dark dots.</p>
        <p>They like to move around.</p>
        <p>They leave a colorful trail behind. </p>
      </div>
    </div>
  );
}

export default App;
