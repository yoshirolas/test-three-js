import React, { Component } from 'react';
import './App.css';
import { create3dWorld } from './threeApp';


class App extends Component {
  componentDidMount() {
    create3dWorld(this.container)
  }

  render() {
    return (
      <div 
        className="App"
        ref={container => this.container = container}
      >
      </div>
    );
  }
}

export default App;
